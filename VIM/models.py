import enum
import config

from sqlalchemy import create_engine, select, update, desc
from sqlalchemy import MetaData, Table, String, Column, Text, DateTime, Boolean, Integer, ForeignKey
from datetime import datetime
from app import db

metadata = MetaData()

class VmType(enum.Enum):
    BASIC = "8 virtual processor cores, 16 GB of virtual RAM, 20 GB of storage space in the root file system - 5 cents/minute"
    LARGE = "32 virtual processor cores, 64 GB of virtual RAM, 20 GB of storage space in the root file system -10 cents/minute"
    ULTRALARGE = "-128 virtual processor cores, 512 GB of virtual RAM, 40 GB of storage space in the root file system- 15 cents /minute"

class EventType(enum.Enum):
    CREATE = "create"
    START = "start"
    STOP = "stop"
    DELETE = "delete"
    UPGRADE = "upgrade"
    DOWNGRADE = "downgrade"

class DbFunctions:
    engine = create_engine(('postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % config.POSTGRES))

    # Create the tables if they don't exist and the default user
    def __init__(self):
        self.users = Table('users', metadata,
                      Column('id', Integer(), primary_key=True),
                      Column('username', String(200), nullable=False),
                      Column('password', String(200), nullable=False)
                      )

        self.events = Table('events', metadata,
              Column('vm_id', Integer(), autoincrement=True,nullable=False, primary_key=True),
              Column('user_id', ForeignKey("users.id"), nullable=False, primary_key=True),
              Column('vm_config', String(200), nullable=False),
              Column('event_type', String(200), nullable=False),
              Column('timestamp', DateTime(), default=datetime.now, primary_key=True)
              )

        metadata.create_all(self.engine)

        r = self.engine.execute(self.users.select())
        user = r.fetchone()
        if not user:
            ins = self.users.insert().values(
                username='root',
                password='root'
            )
            r = self.engine.execute(ins)
            r.inserted_primary_key
            print("We made a user")

    # Creates a new vim with current timestamp
    def create_new_vm(self, vm_type, userid):
        ins = self.events.insert().values(
            user_id = userid,
            vm_config = vm_type,
            event_type = EventType.CREATE.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key
        print("created ne vm")

    # Returns the vms that were created by the user
    def all_vms_by_user(self, userid):
        connection = self.engine.connect()
        result = connection.execute("SELECT DISTINCT * FROM events WHERE events.user_id = %s ORDER BY timestamp DESC" % userid).fetchall()
        current_user_vms = []
        previously_found_vm_ids = {}
        for row in result:
            if row.vm_id not in previously_found_vm_ids:
                if row.event_type != EventType.DELETE.name:
                    current_user_vms.append(row)
                previously_found_vm_ids[row.vm_id] = row.vm_id

        connection.close()
        return current_user_vms

    # Inserts a new row in the DB with the UPGRADE event type and scales configuration
    def upgrade_vm_configuration(self, vm_id):
        connection = self.engine.connect()
        result = connection.execute("select * from events WHERE events.vm_id = %s ORDER BY timestamp DESC " % vm_id).fetchone()
        if not result:
            print("vm_id doesn't exist when trying to upgrade %s" % vm_id)
            return

        config_to_change = VmType.ULTRALARGE.name
        if result.vm_config == VmType.BASIC.name:
            config_to_change = VmType.LARGE.name

        ins = self.events.insert().values(
            user_id=result.user_id,
            vm_id= vm_id,
            vm_config=config_to_change,
            event_type=EventType.UPGRADE.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key

    # Inserts a new row in the DB with the DOWNGRADE event type
    def downgrade_vm_configuration(self, vm_id):
        connection = self.engine.connect()
        result = connection.execute("select * from events WHERE events.vm_id = %s ORDER BY timestamp DESC " % vm_id).fetchone()
        if not result:
            print("vm_id doesn't exist when trying to downgrade %s" % vm_id)
            return

        config_to_change = VmType.BASIC.name
        if result.vm_config == VmType.ULTRALARGE.name:
            config_to_change = VmType.LARGE.name

        ins = self.events.insert().values(
            user_id=result.user_id,
            vm_id= vm_id,
            vm_config=config_to_change,
            event_type=EventType.DOWNGRADE.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key

    # Inserts a new row in the DB with the START event type
    def start_vm(self, vm_id):
        connection = self.engine.connect()
        result = connection.execute("select * from events WHERE events.vm_id = %s ORDER BY timestamp DESC " % vm_id).fetchone()
        if not result:
            print("vm_id doesn't exist when trying to start %s" % vm_id)
            return

        ins = self.events.insert().values(
            user_id=result.user_id,
            vm_id= vm_id,
            vm_config=result.vm_config,
            event_type=EventType.START.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key

    # Inserts a new row in the DB with the STOP event type
    def stop_vm(self, vm_id):
        connection = self.engine.connect()
        result = connection.execute("select * from events WHERE events.vm_id = %s ORDER BY timestamp DESC " % vm_id).fetchone()
        if not result:
            print("vm_id doesn't exist when trying to STOP %s" % vm_id)
            return

        ins = self.events.insert().values(
            user_id=result.user_id,
            vm_id= vm_id,
            vm_config=result.vm_config,
            event_type=EventType.STOP.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key

    # Inserts a new row in the DB with the DELETE event type
    def delete_vm(self, vm_id):
        connection = self.engine.connect()
        result = connection.execute(
            "select * from events WHERE events.vm_id = %s ORDER BY timestamp DESC " % vm_id).fetchone()
        if not result:
            print("vm_id doesn't exist when trying to DELETE %s" % vm_id)
            return

        ins = self.events.insert().values(
            user_id=result.user_id,
            vm_id=vm_id,
            vm_config=result.vm_config,
            event_type=EventType.DELETE.name
        )
        r = self.engine.execute(ins)
        r.inserted_primary_key

    # True if user has account, False otherwise
    def match_user_credentials(self, username, password):
        connection = self.engine.connect()
        result = connection.execute(
            "select * from users WHERE '{}' = users.username".format(username)).fetchone()

        if not result:
            return False
        elif result.password == password:
            return True
        return False


DbFunctions = DbFunctions()
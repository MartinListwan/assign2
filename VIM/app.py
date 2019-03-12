import os
import json
import config
from flask import Flask, send_from_directory, render_template, redirect, request
from flask_login import LoginManager, login_required, logout_user

app = Flask(__name__, static_folder='build')
login_manager = LoginManager()
login_manager.init_app(app)

# Postgres stuff. To configure the database look at config.py
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % config.POSTGRES
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import DbFunctions, VmType, EventType


app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True

# Serve the React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@login_required
def serve(path):
    if path != "" and os.path.exists('build/' + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':

        if DbFunctions.match_user_credentials(request.form['username'], request.form['password']):
            print("User logged in")
            DbFunctions.create_new_vm(VmType.BASIC.name, 1);
        else:
            print("Invalid user")
        return redirect(next or flask.url_for('index'))
    if request.method == 'GET':
        return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')

@app.route('/createVM', methods=["Post"])
@login_required
def createVM():

    if request.form['vm_config'] == "Basic":
        DbFunctions.create_new_vm(VmType.BASIC.name, 1)
        return 'Created Basic vm'
    elif request.form['vm_config'] == "Large":
        DbFunctions.create_new_vm(VmType.LARGE.name, 1)
        return 'Created Large vm'
    else:
        DbFunctions.create_new_vm(VmType.ULTRALARGE.name,1)
        return 'Created UltraLarge vm'

@app.route('/startVM', methods=["Post"])
@login_required
def startVM():
   DbFunctions.start_vm(request.form['vm_id'])
   return "started:" + request.form['vm_id']

@app.route('/stopVM', methods=["Post"])
@login_required
def stopVM():
   DbFunctions.stop_vm(request.form['vm_id'])
   return "stopped:" + request.form['vm_id']

@app.route('/deleteVM', methods=["Post"])
@login_required
def deleteVM():
   DbFunctions.delete_vm(request.form['vm_id'])
   return "deleted:" + request.form['vm_id']

@app.route('/upgradeVM', methods=["Post"])
@login_required
def upgradeVM():
   DbFunctions.upgrade_vm_configuration(request.form['vm_id'])
   return "upgraded:" + request.form['vm_id']

@app.route('/downgradeVM', methods=["Post"])
@login_required
def downgradeVM():
   DbFunctions.downgrade_vm_configuration(request.form['vm_id'])
   return "downgraded:" + request.form['vm_id']

@app.route('/totalUsageVM', methods=["Post"])
@login_required
def totalUsageVM():
   arr = DbFunctions.get_all_events_from_certain_vm(request.form['vm_id'])
   items = []
   totalCost =0
   for event in arr:
       if event.vm_id ==request.form['vm_id']:
            items.add(event)
   start = 0
   stop = 0
   for item in items:
       if item.event_type == EventType.START.name:
           start = event.timestamp
       if item.event_type == EventType.STOP.name:
           stop = event.timestamp
       if start!=0 & stop!=0:
           cost = 0
           if item.vm_config == VmType.BASIC.name:
               cost = 0.05/60
           if item.vm_config == VmType.LARGE.name:
               cost = 0.10/60
           if item.vm_config == VmType.ULTRALARGE.name:
               cost = 0.15/60
           timeUsed = start - stop
           totalCost = totalCost + (timeUsed.total_seconds()*cost)
           stop = 0
           start = 0
   return totalCost


@app.route('/totalUsageUser', methods=["Post"])
@login_required
def totalUsageUser():
    arr = DbFunctions.all_active_vms_by_user(request.form['user_id'])
    items = []
    totalCost = 0
    for event in arr:
        if event.user_id == request.form['user_id']:
            items.add(event)
    start = 0
    stop = 0
    for item in items:
        if item.event_type == EventType.START.name:
            start = event.timestamp
            for i in items:
                if i.event_type == EventType.STOP.name& i.vm_id== item.vm_id:
                    stop = event.timestamp
        if start != 0 & stop != 0:
            cost = 0
            if item.vm_config == VmType.BASIC.name:
                cost = 0.05 / 60
            if item.vm_config == VmType.LARGE.name:
                cost = 0.10 / 60
            if item.vm_config == VmType.ULTRALARGE.name:
                cost = 0.15 / 60
            timeUsed = start - stop
            totalCost = totalCost + (timeUsed.total_seconds() * cost)
            stop = 0
            start = 0
    return totalCost

def logout():
    logout_user()
    return redirect('/login')

@login_manager.unauthorized_handler
def unauthorized():
    return redirect('/login') 

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)


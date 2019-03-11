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

from models import DbFunctions

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

@login_manager.unauthorized_handler
def unauthorized():
    return redirect('/login') 

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)


import os
import json
from flask import Flask, send_from_directory, render_template, redirect, request
from flask_login import LoginManager, login_required, logout_user

app = Flask(__name__, static_folder='build')
login_manager = LoginManager()
login_manager.init_app(app)

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
        print(request.form.to_dict())
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


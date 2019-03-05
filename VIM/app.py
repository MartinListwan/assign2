import os
import json
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='assets')

# Serve the React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("assets/" + path):
        return send_from_directory('assets', path)
    else:
        return send_from_directory('assets', 'index.html')

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
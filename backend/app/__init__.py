from flask import Flask
from flask_cors import CORS


def create_app():
    app=Flask(__name__)

    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type' 
    app.config['Access-Control-Allow-Credentials'] = "true"
    return app



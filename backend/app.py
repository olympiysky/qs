from flask import Flask
from flask_cors import CORS
from database import db
from config import Config
from routes.queue_routes import queue_bp
from extensions import socketio

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
socketio.init_app(app)

app.register_blueprint(queue_bp, url_prefix="/api/queue")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True)

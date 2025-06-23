from database import db
from datetime import datetime

class QueueEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    number = db.Column(db.Integer, nullable=False, unique=True)
    status = db.Column(db.String(20), default="waiting")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class CallLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    queue_entry_id = db.Column(db.Integer, db.ForeignKey('queue_entry.id'))
    desk = db.Column(db.String(10))
    called_at = db.Column(db.DateTime, default=datetime.utcnow)

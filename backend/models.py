from database import db
from datetime import datetime

# Категории в человекочитаемом виде
CATEGORY_LABELS = {
    "grant": "Бакалавр (грант)",
    "paid": "Бакалавр (платное)",
    "magistracy": "Магистратура",
    "phd": "PhD",
    "platonus": "Platonus"
}

class QueueEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    number = db.Column(db.Integer, nullable=False, unique=True)
    status = db.Column(db.String(20), default="waiting")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    desk = db.Column(db.String(10))

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "category": CATEGORY_LABELS.get(self.category, self.category),
            "number": self.number,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "desk": self.desk  # ← обязательно
        }

class CallLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    queue_entry_id = db.Column(db.Integer, db.ForeignKey('queue_entry.id'))
    desk = db.Column(db.String(10))
    called_at = db.Column(db.DateTime, default=datetime.utcnow)

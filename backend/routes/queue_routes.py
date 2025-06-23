from flask import Blueprint, request, jsonify
from models import QueueEntry, db
from extensions import socketio

queue_bp = Blueprint("queue", __name__)

@queue_bp.route("/", methods=["POST"])
def register_in_queue():
    data = request.json
    full_name = data.get("full_name")
    category = data.get("category")

    base = {
        "grant": 1,
        "paid": 500,
        "magistracy": 600,
        "phd": 700,
        "platonus": 800
    }.get(category, 1)

    latest = (
        QueueEntry.query.filter_by(category=category)
        .order_by(QueueEntry.number.desc())
        .first()
    )
    number = base if not latest else latest.number + 1

    entry = QueueEntry(full_name=full_name, category=category, number=number)
    db.session.add(entry)
    db.session.commit()

    socketio.emit("new_registration", {
        "full_name": full_name,
        "number": number,
        "category": category
    })

    return jsonify({"success": True, "number": number, "message": "Registered successfully"})

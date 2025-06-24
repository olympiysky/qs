from flask import Blueprint, request, jsonify
from backend.models import Call
from backend.models import QueueEntry, CallLog, db
from backend.extensions import socketio
from backend.database import db
from datetime import datetime

queue_bp = Blueprint("queue", __name__)

# Регистрация в очереди
@queue_bp.route("/register", methods=["POST"])
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


# Получение всей очереди
@queue_bp.route("/", methods=["GET"])
def get_queue():
    entries = QueueEntry.query.order_by(QueueEntry.number).all()
    return jsonify([entry.to_dict() for entry in entries])


# Вызов следующего по категории
@queue_bp.route("/call", methods=["POST"])
def call_next():
    data = request.json
    category = data.get("category")
    desk = data.get("desk")

    entry = (
        QueueEntry.query
        .filter_by(category=category, status="waiting")
        .order_by(QueueEntry.number)
        .first()
    )

    if not entry:
        return jsonify({"success": False, "message": "Нет ожидающих в очереди"})

    entry.status = "called"
    entry.desk = desk # Устанавливаем стол для вызова
    db.session.commit()

    log = CallLog(queue_entry_id=entry.id, desk=desk)
    db.session.add(log)
    db.session.commit()

    call = Call(number=entry.number, timestamp=datetime.utcnow())
    db.session.add(call)
    db.session.commit()

    socketio.emit("call", {
        "full_name": entry.full_name,
        "number": entry.number,
        "category": entry.category,
        "desk": desk
    })

    return jsonify({
    "success": True,
    "message": "Абитуриент вызван",
    "desk": desk,
    "number": entry.number,
    "full_name": entry.full_name,
    "category": entry.category
})

@queue_bp.route('/last-calls', methods=['GET'])
def get_last_calls():
    # Получаем последние 10 вызовов
    last_calls = Call.query.order_by(Call.timestamp.desc()).limit(10).all()
    result = []
    for call in last_calls:
        # Пытаемся найти запись в очереди с таким номером
        entry = QueueEntry.query.filter_by(number=call.number).first()
        result.append({
            "id": call.id,
            "number": call.number,
            "timestamp": call.timestamp.isoformat(),
            "full_name": entry.full_name if entry else '-',
            "desk": entry.desk if entry else '-'
        })
    return jsonify(result)

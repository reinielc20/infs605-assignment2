from flask import Flask, jsonify, request
import datetime

app = Flask(__name__)

notifications = []

@app.route("/notify", methods=["POST"])
def send_notification():
    data = request.get_json()
    message = f"Notification: {data.get('message', 'No message provided')}"
    entry = {"id": len(notifications)+1, "message": message, "timestamp": datetime.datetime.now().isoformat()}
    notifications.append(entry)
    print(f"[LOG] {message}")  # simulate sending email/log
    return jsonify(entry), 201

@app.route("/notifications", methods=["GET"])
def get_notifications():
    return jsonify(notifications)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

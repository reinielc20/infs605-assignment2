from flask import Flask, jsonify, request

app = Flask(__name__)

feedback_list = [
    {"id": 1, "course": "INFS605", "rating": 5, "comment": "Great course!"}, {"id": 2, "course": "COMP705", "rating": 4, "comment": "Very informative."}, {"id": 2, "course": "COMP705", "rating": 4, "comment": "Very informative."}, {"id": 3, "course": "COMP703", "rating": 4, "comment": "Challenging but fun."}, {"id": 4, "course": "INFS502", "rating": 3, "comment": "Simple and easy."} ]


@app.route("/feedback", methods=["GET"])
def get_feedback():
    return jsonify(feedback_list)

@app.route("/feedback", methods=["POST"])
def add_feedback():
    data = request.get_json()
    new_feedback = {
        "id": len(feedback_list) + 1,
        "course": data["course"],
        "rating": data["rating"],
        "comment": data["comment"]
    }
    feedback_list.append(new_feedback)
    return jsonify(new_feedback), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
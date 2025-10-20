from flask import Flask, jsonify, request

app = Flask(__name__)

courses = [ {"id": 1, "code": "INFS605", "title": "Microservices"}, {"id": 2, "code": "INFS501", "title": "Digital Services"}, {"id": 2, "code": "INFS501", "title": "Digital Services"}, {"id": 3, "code": "COMP705", "title": "Special topic"}, {"id": 4, "code": "COMP703", "title": "Research and Development"} ]



@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses)

@app.route("/courses", methods=["POST"])
def add_course():
    data = request.get_json()
    new_course = {"id": len(courses)+1, "code": data["code"], "title": data["title"]}
    courses.append(new_course)
    return jsonify(new_course), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

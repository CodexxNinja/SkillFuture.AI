from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app)

try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    client.admin.command('ismaster')
    print("MongoDB connected successfully")
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    # Note: Start MongoDB service with 'net start MongoDB'
    raise
db = client["skillfuture"]
users_col = db["users"]

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if users_col.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = generate_password_hash(password)
    users_col.insert_one({"email": email, "password": hashed_password})

    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_col.find_one({"email": email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "email": email})

@app.route('/onboarding', methods=['POST'])
def onboarding():
    data = request.json

    skills_list = [s.strip() for s in data.get("skills", "").split(",")]

    user_data = {
        "name": data.get("name"),
        "college": data.get("college"),
        "degree": data.get("degree"),
        "year": data.get("year"),
        "skills": skills_list,
        "experience_level": data.get("experience_level"),
        "projects": data.get("projects"),
        "domain_interest": data.get("domain"),
        "goal": data.get("goal"),
        "github": data.get("github"),
        "linkedin": data.get("linkedin"),
        "self_rating": {
            "coding": int(data.get("coding", 1)),
            "debugging": int(data.get("debugging", 1)),
            "problem_solving": int(data.get("problem_solving", 1))
        },
        "learning_style": data.get("learning_style"),
        "daily_hours": data.get("daily_hours")
    }

    # FIX: Changed 'collection' to 'users_col'
    users_col.insert_one(user_data) 

    return jsonify({"message": "Profile saved successfully 🚀"})

if __name__ == '__main__':
    # Running on default port 5000
    app.run(debug=True)
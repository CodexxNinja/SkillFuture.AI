from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Replace with your Atlas connection string
MONGO_URI = "mongodb+srv://skillfutureai_db_user:skillFuture%40ai@cluster0.rxmlpct.mongodb.net/skillfutureai?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client['skillfutureai']
users_col = db['users']
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

if __name__ == '__main__':
    app.run(debug=True)
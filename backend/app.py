from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- Your Original MongoDB Connection Logic ---
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

# --- The Assessment Logic you asked to add ---
assessment_questions = [
    {
        "id": 1,
        "type": "mcq",
        "question": "What is the output of print(3 + 2 * 2)?",
        "options": ["10", "7", "8", "12"],
        "answer": "7",
        "explanation": "Multiplication happens first (2*2=4), then 3+4=7."
    },
    {
        "id": 2,
        "type": "mcq",
        "question": "Which data type is used to store text?",
        "options": ["int", "float", "str", "bool"],
        "answer": "str",
        "explanation": "Strings (str) are used to store text in Python."
    },
    {
        "id": 3,
        "type": "mcq",
        "question": "Which symbol is used for comments in Python?",
        "options": ["//", "#", "/* */", "--"],
        "answer": "#",
        "explanation": "# is used to write comments in Python."
    },
    {
        "id": 4,
        "type": "mcq",
        "question": "Which keyword is used to define a function in Python?",
        "options": ["func", "define", "def", "function"],
        "answer": "def",
        "explanation": "Functions in Python are defined using the 'def' keyword."
    },
    {
        "id": 5,
        "type": "mcq",
        "question": "What will len([1,2,3,4]) return?",
        "options": ["3", "4", "5", "Error"],
        "answer": "4",
        "explanation": "len() returns the number of elements in a list."
    },
    {
        "id": 6,
        "type": "mcq",
        "question": "Which operator is used for equality check?",
        "options": ["=", "==", "!=", ">="],
        "answer": "==",
        "explanation": "== is used to compare two values."
    },
    {
        "id": 7,
        "type": "mcq",
        "question": "Which loop is used when number of iterations is known?",
        "options": ["while", "for", "do-while", "loop"],
        "answer": "for",
        "explanation": "For loop is used when iterations are predefined."
    },
    {
        "id": 8,
        "type": "mcq",
        "question": "Which of these is a valid variable name?",
        "options": ["1name", "name_1", "name-1", "@name"],
        "answer": "name_1",
        "explanation": "Variable names cannot start with numbers or special symbols except underscore."
    }
]

# --- Your Original Routes (Unchanged Logic) ---

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

    # Fixed: Use users_col as defined at top
    users_col.insert_one(user_data) 
    return jsonify({"message": "Profile saved successfully 🚀"})

# --- New Assessment Route ---
@app.route('/get_questions', methods=['GET'])
def get_questions():
    return jsonify(assessment_questions)

# --- Submit Assessment Logic ---
@app.route('/submit-assessment', methods=['POST'])
def submit_assessment():
    try:
        data = request.json
        user_email = data.get('email')
        # Extract the answers dictionary from the nested JSON
        user_answers = data.get('answers', {}) 

        score = 0
        weak_areas = []
        strong_areas = []

        for q in assessment_questions:
            qid = str(q["id"])
            # Ensure we compare strings properly by cleaning whitespace and case
            correct = str(q["answer"]).lower().strip()
            user_ans = str(user_answers.get(qid, "")).lower().strip()

            if user_ans == correct:
                score += 1
                strong_areas.append(q["question"])
            else:
                weak_areas.append(q["question"])

        total = len(assessment_questions)
        percentage = (score / total) * 100

        # Skill level Logic
        if percentage < 40:
            level = "Beginner"
        elif percentage < 70:
            level = "Intermediate"
        else:
            level = "Advanced"

        # Domain Recommendation Logic
        if level == "Beginner":
            domain = "Start with Python Fundamentals"
        elif level == "Intermediate":
            domain = "Backend Development (APIs + DB)"
        else:
            domain = "Advanced Backend / System Design"

        result = {
            "email": user_email,
            "score": score,
            "total": total,
            "percentage": percentage,
            "level": level,
            "recommended_domain": domain,
            "strong_areas": strong_areas,
            "weak_areas": weak_areas,
            "timestamp": datetime.now()
        }

        # Save in MongoDB (using users_col as defined in your previous script)
        # We use update_one with upsert=True so we don't create 100 documents for 1 user
        users_col.update_one(
            {"email": user_email},
            {"$set": {"latest_assessment": result}},
            upsert=True
        )

        # Return the result (jsonify handles datetime objects poorly, 
        # so we convert timestamp to string or just exclude it from the response)
        response_data = result.copy()
        response_data["timestamp"] = result["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        
        return jsonify(response_data)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Server error", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
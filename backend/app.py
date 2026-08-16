from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import requests
import re
import os
app = Flask(__name__)
CORS(app)


# --- MongoDB ---
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
    client.admin.command('ismaster')
    print("MongoDB connected successfully")
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    raise

db = client["skillfuture"]
users_col = db["users"]

# --- Gemini API Key (Optional) ---
# Set your key: export GEMINI_API_KEY="your_key_here"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# --- YouTube Data API Key ---
# Set your key: export YOUTUBE_API_KEY="your_key_here"
YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY", "")

print(f"DEBUG: GEMINI_API_KEY loaded = {bool(GEMINI_API_KEY)}, length = {len(GEMINI_API_KEY)}")
print(f"DEBUG: YOUTUBE_API_KEY loaded = {bool(YOUTUBE_API_KEY)}, length = {len(YOUTUBE_API_KEY)}")
# ─────────────────────────────────────────────────────────────────
# DOMAIN-SPECIFIC QUESTION BANK
# ─────────────────────────────────────────────────────────────────
QUESTION_BANK = {
    "Frontend Development": [
        {
            "id": 1, "type": "mcq", "topic": "CSS Flexbox",
            "question": "Which CSS property creates a flex container?",
            "options": ["display: grid", "display: flex", "display: block", "display: inline"],
            "answer": "display: flex",
            "explanation": "display: flex enables flexbox layout on the container element."
        },
        {
            "id": 2, "type": "mcq", "topic": "React Hooks",
            "question": "What does the React useState hook return?",
            "options": ["Only a value", "Only a setter function", "An array [value, setter]", "An object with methods"],
            "answer": "An array [value, setter]",
            "explanation": "useState returns [state, setState] — a value and its updater function."
        },
        {
            "id": 3, "type": "mcq", "topic": "HTML Basics",
            "question": "What is the correct HTML tag for the largest heading?",
            "options": ["<h6>", "<heading>", "<h1>", "<head>"],
            "answer": "<h1>",
            "explanation": "<h1> is the largest heading tag; h6 is the smallest."
        },
        {
            "id": 4, "type": "mcq", "topic": "JavaScript DOM",
            "question": "Which JavaScript method selects an element by its ID?",
            "options": ["querySelector", "getElementById", "getElement", "findById"],
            "answer": "getElementById",
            "explanation": "document.getElementById('id') returns the element with that specific ID."
        },
        {
            "id": 5, "type": "mcq", "topic": "CSS Basics",
            "question": "What does CSS stand for?",
            "options": ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling Syntax", "Coded Stylesheet"],
            "answer": "Cascading Style Sheets",
            "explanation": "CSS = Cascading Style Sheets — it styles HTML documents."
        },
        {
            "id": 6, "type": "mcq", "topic": "React Virtual DOM",
            "question": "What is React's virtual DOM?",
            "options": [
                "A real browser DOM copy",
                "A lightweight in-memory representation of the DOM",
                "A MongoDB database",
                "A browser extension"
            ],
            "answer": "A lightweight in-memory representation of the DOM",
            "explanation": "React diffs the virtual DOM with the real DOM to minimize expensive updates."
        },
        {
            "id": 7, "type": "mcq", "topic": "CSS Units",
            "question": "Which CSS unit is relative to the root element's font-size?",
            "options": ["em", "px", "rem", "vh"],
            "answer": "rem",
            "explanation": "rem (root em) is relative to the <html> element's font-size."
        },
        {
            "id": 8, "type": "mcq", "topic": "React Hooks",
            "question": "Which React hook replaces componentDidMount?",
            "options": ["useEffect", "useState", "useRef", "useContext"],
            "answer": "useEffect",
            "explanation": "useEffect with [] dependency array runs once after mount — equivalent to componentDidMount."
        },
        {
            "id": 9, "type": "mcq", "topic": "JavaScript Fundamentals",
            "question": "What does typeof null return in JavaScript?",
            "options": ["null", "undefined", "object", "string"],
            "answer": "object",
            "explanation": "typeof null === 'object' is a long-standing JavaScript bug kept for backward compatibility."
        },
        {
            "id": 10, "type": "mcq", "topic": "HTML Forms",
            "question": "Which HTML attribute makes an input field mandatory?",
            "options": ["mandatory", "required", "validate", "must"],
            "answer": "required",
            "explanation": "The 'required' attribute prevents form submission when the field is empty."
        },
    ],
    "Backend Development": [
        {
            "id": 1, "type": "mcq", "topic": "Python Fundamentals",
            "question": "What is the output of: print(3 + 2 * 2)?",
            "options": ["10", "7", "8", "12"],
            "answer": "7",
            "explanation": "Operator precedence: multiplication first (2×2=4), then 3+4=7."
        },
        {
            "id": 2, "type": "mcq", "topic": "HTTP Methods",
            "question": "Which HTTP method is used to CREATE a new resource?",
            "options": ["GET", "PUT", "POST", "DELETE"],
            "answer": "POST",
            "explanation": "POST creates new resources; PUT updates existing ones."
        },
        {
            "id": 3, "type": "mcq", "topic": "SQL Joins",
            "question": "What does SQL JOIN do?",
            "options": ["Deletes rows", "Combines rows from two or more tables", "Updates data", "Creates a table"],
            "answer": "Combines rows from two or more tables",
            "explanation": "JOIN merges rows from multiple tables based on a related column."
        },
        {
            "id": 4, "type": "mcq", "topic": "Python Fundamentals",
            "question": "Which Python keyword defines a function?",
            "options": ["func", "define", "def", "function"],
            "answer": "def",
            "explanation": "Python functions are defined with the 'def' keyword."
        },
        {
            "id": 5, "type": "mcq", "topic": "HTTP Status Codes",
            "question": "What HTTP status code means 'Not Found'?",
            "options": ["200", "401", "404", "500"],
            "answer": "404",
            "explanation": "404 means the server cannot find the requested resource."
        },
        {
            "id": 6, "type": "mcq", "topic": "NoSQL Databases",
            "question": "Which of these is a NoSQL database?",
            "options": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
            "answer": "MongoDB",
            "explanation": "MongoDB is a document-oriented NoSQL database."
        },
        {
            "id": 7, "type": "mcq", "topic": "ORM Concepts",
            "question": "What does ORM stand for?",
            "options": ["Object Relational Mapping", "Online Resource Manager", "Optimized Runtime Model", "Object Request Module"],
            "answer": "Object Relational Mapping",
            "explanation": "ORM maps database tables to code objects for easier data access."
        },
        {
            "id": 8, "type": "mcq", "topic": "Middleware",
            "question": "What is middleware in web development?",
            "options": ["A database layer", "Software bridging request and response pipeline", "A frontend framework", "A testing tool"],
            "answer": "Software bridging request and response pipeline",
            "explanation": "Middleware processes requests/responses between client and business logic."
        },
        {
            "id": 9, "type": "mcq", "topic": "Flask & REST APIs",
            "question": "Which Python library is used for building REST APIs?",
            "options": ["NumPy", "Pandas", "Flask", "Matplotlib"],
            "answer": "Flask",
            "explanation": "Flask is a lightweight micro web framework for building REST APIs."
        },
        {
            "id": 10, "type": "mcq", "topic": "Python Fundamentals",
            "question": "What does len([1, 2, 3, 4]) return?",
            "options": ["3", "4", "5", "Error"],
            "answer": "4",
            "explanation": "len() returns the number of elements in a list. This list has 4 elements."
        },
    ],
    "AIML": [
        {
            "id": 1, "type": "mcq", "topic": "Supervised Learning",
            "question": "What is supervised learning?",
            "options": [
                "Learning with no labels",
                "Learning with labeled training data",
                "Reinforcement from environment",
                "Self-supervised learning"
            ],
            "answer": "Learning with labeled training data",
            "explanation": "Supervised learning uses labeled input-output pairs to train predictive models."
        },
        {
            "id": 2, "type": "mcq", "topic": "Scikit-learn",
            "question": "Which Python library is most used for Machine Learning?",
            "options": ["Flask", "Pandas", "Scikit-learn", "Django"],
            "answer": "Scikit-learn",
            "explanation": "Scikit-learn provides ML algorithms, pipelines, and evaluation tools."
        },
        {
            "id": 3, "type": "mcq", "topic": "Overfitting",
            "question": "What does 'overfitting' mean?",
            "options": [
                "Model performs well on training, poorly on test data",
                "Model performs well on both sets",
                "Model fails to train",
                "Model has too few parameters"
            ],
            "answer": "Model performs well on training, poorly on test data",
            "explanation": "Overfitting means the model memorized training data instead of learning general patterns."
        },
        {
            "id": 4, "type": "mcq", "topic": "Neural Networks",
            "question": "What is a neural network?",
            "options": [
                "A type of database",
                "Interconnected nodes that learn from data, inspired by the brain",
                "A web server",
                "A sorting algorithm"
            ],
            "answer": "Interconnected nodes that learn from data, inspired by the brain",
            "explanation": "Neural networks use layers of nodes to learn hierarchical data representations."
        },
        {
            "id": 5, "type": "mcq", "topic": "Deep Learning Frameworks",
            "question": "Which library is the primary framework for deep learning?",
            "options": ["Matplotlib", "TensorFlow", "SQLAlchemy", "BeautifulSoup"],
            "answer": "TensorFlow",
            "explanation": "TensorFlow (and PyTorch) are the leading deep learning frameworks."
        },
        {
            "id": 6, "type": "mcq", "topic": "Model Evaluation",
            "question": "What is the purpose of a train/test split?",
            "options": [
                "To reduce dataset size",
                "To evaluate model generalization on unseen data",
                "To increase model speed",
                "To remove duplicates"
            ],
            "answer": "To evaluate model generalization on unseen data",
            "explanation": "Holding out test data simulates how the model performs on real, unseen examples."
        },
        {
            "id": 7, "type": "mcq", "topic": "Classification Algorithms",
            "question": "Which algorithm is commonly used for classification?",
            "options": ["K-Means", "PCA", "Random Forest", "Linear Regression"],
            "answer": "Random Forest",
            "explanation": "Random Forest is an ensemble method used for classification and regression."
        },
        {
            "id": 8, "type": "mcq", "topic": "NLP Fundamentals",
            "question": "What does NLP stand for?",
            "options": ["Natural Language Processing", "Neural Learning Protocol", "Numeric Learning Program", "Network Layer Protocol"],
            "answer": "Natural Language Processing",
            "explanation": "NLP enables computers to understand, interpret, and generate human language."
        },
        {
            "id": 9, "type": "mcq", "topic": "Data Preprocessing",
            "question": "What does data normalization do?",
            "options": ["Removes duplicates", "Scales features to a similar range", "Adds more training data", "Splits datasets"],
            "answer": "Scales features to a similar range",
            "explanation": "Normalization prevents features with larger magnitudes from dominating the model."
        },
        {
            "id": 10, "type": "mcq", "topic": "Pandas Basics",
            "question": "Which Pandas method shows the first 5 rows of a DataFrame?",
            "options": ["df.tail()", "df.info()", "df.head()", "df.describe()"],
            "answer": "df.head()",
            "explanation": "df.head() returns the first 5 rows of a DataFrame by default."
        },
    ]
}

# ─────────────────────────────────────────────────────────────────
# UTILITIES
# ─────────────────────────────────────────────────────────────────
def normalize_domain(domain):
    if not domain:
        return "Backend Development"
    d = domain.lower()
    if "frontend" in d:
        return "Frontend Development"
    if "aiml" in d or "ai" in d or "ml" in d or "machine" in d:
        return "AIML"
    return "Backend Development"

def extract_github_username(url):
    if not url:
        return None
    match = re.search(r'github\.com/([^/?\s]+)', url)
    return match.group(1) if match else None

def scan_github(github_url):
    username = extract_github_username(github_url)
    if not username:
        return {"repo_count": 0, "followers": 0, "github_score": 0, "username": ""}
    try:
        resp = requests.get(
            f"https://api.github.com/users/{username}",
            headers={"Accept": "application/vnd.github+json"},
            timeout=6
        )
        if resp.status_code == 200:
            data = resp.json()
            repo_count = data.get("public_repos", 0)
            followers = data.get("followers", 0)
            github_score = min(25, repo_count * 2) + min(5, followers // 5)
            return {
                "repo_count": repo_count,
                "followers": followers,
                "github_score": github_score,
                "username": username,
                "avatar_url": data.get("avatar_url", ""),
                "bio": data.get("bio", "")
            }
    except Exception as e:
        print(f"GitHub scan error: {e}")
    return {"repo_count": 0, "followers": 0, "github_score": 0, "username": username}

def search_youtube_video(topic):
    """Finds one relevant tutorial video for a given topic via YouTube Data API v3."""
    if not YOUTUBE_API_KEY:
        return None
    try:
        resp = requests.get(
            "https://www.googleapis.com/youtube/v3/search",
            params={
                "part": "snippet",
                "q": f"{topic} tutorial",
                "type": "video",
                "maxResults": 1,
                "relevanceLanguage": "en",
                "key": YOUTUBE_API_KEY
            },
            timeout=8
        )
        if resp.status_code == 200:
            items = resp.json().get("items", [])
            if items:
                video = items[0]
                video_id = video["id"]["videoId"]
                snippet = video["snippet"]
                return {
                    "video_id": video_id,
                    "title": snippet.get("title", ""),
                    "channel": snippet.get("channelTitle", ""),
                    "thumbnail": snippet.get("thumbnails", {}).get("medium", {}).get("url", ""),
                    "url": f"https://www.youtube.com/watch?v={video_id}"
                }
    except Exception as e:
        print(f"YouTube search error: {e}")
    return None

def generate_challenge(topic, domain):
    """Returns a short hands-on coding challenge description for a topic."""
    templates = {
        "Frontend Development": f"Build a small component or webpage that demonstrates '{topic}' in practice. Deploy it and add it to your portfolio.",
        "Backend Development": f"Write a short script or API endpoint that applies '{topic}'. Test it with sample input and document your approach.",
        "AIML": f"Implement a minimal example using '{topic}' on a small public dataset. Note your results in a short README."
    }
    return templates.get(domain, f"Practice a small hands-on exercise focused on '{topic}'.")

def generate_gemini_analysis(user_data):
    if not GEMINI_API_KEY:
        return None
    try:
        skills_str = ", ".join(user_data.get("skills", [])) or "Not specified"
        assessment = user_data.get("latest_assessment", {})
        prompt = f"""You are a career coach analyzing a student's tech profile. Be concise and practical.

Profile:
- Name: {user_data.get('name', 'Student')}
- Domain: {user_data.get('domain_interest', 'Tech')}
- Experience Level: {user_data.get('experience_level', 'Beginner')}
- Skills: {skills_str}
- Assessment Score: {assessment.get('percentage', 0):.1f}% ({assessment.get('level', 'Unknown')} level)
- GitHub Repos: {user_data.get('github_data', {}).get('repo_count', 0)}
- Self Ratings: Coding {user_data.get('self_rating', {}).get('coding', 1)}/5, Debugging {user_data.get('self_rating', {}).get('debugging', 1)}/5

Provide a personalized analysis in exactly this format (no markdown, plain text):

PROFILE_SUMMARY: [2 sentences about their current standing]
STRENGTH_1: [Key technical strength]
STRENGTH_2: [Another strength]
GAP_1: [Critical skill gap to address]
GAP_2: [Another gap]
ACTION_1: [Specific immediate action to get hired faster]
ACTION_2: [Another specific action]
JOB_READINESS: [A percentage 0-100 based on their overall profile]

Keep each field to 1 sentence max."""

        resp = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            headers={
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY,
                "Api-Revision": "2026-05-20"
            },
            json={
                "model": "gemini-3.5-flash",
                "input": prompt
            },
            timeout=40
        )
        print(f"DEBUG: Gemini response status = {resp.status_code}")
        if resp.status_code == 200:
            result = resp.json()
            for step in result.get("steps", []):
                if step.get("type") == "model_output":
                    for content_item in step.get("content", []):
                        if content_item.get("type") == "text":
                            return content_item.get("text", "")
            print("DEBUG: No model_output text found in steps")
        else:
            print(f"DEBUG: Gemini error body = {resp.text}")
    except Exception as e:
        print(f"Gemini error: {e}")
    return None

# ─────────────────────────────────────────────────────────────────
# ROUTES
# ─────────────────────────────────────────────────────────────────

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email', '').strip()
    password = data.get('password', '')
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    if users_col.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 400
    users_col.insert_one({"email": email, "password": generate_password_hash(password)})
    return jsonify({"message": "Account created successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', '').strip()
    password = data.get('password', '')
    user = users_col.find_one({"email": email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid credentials"}), 401
    return jsonify({"message": "Login successful", "email": email})

@app.route('/check_status', methods=['GET'])
def check_status():
    email = request.args.get('email', '').strip()
    if not email:
        return jsonify({"error": "Email required"}), 400
    user = users_col.find_one({"email": email}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"status": "no_user"}), 404

    has_profile = bool(user.get("name") and user.get("profile_completed_at"))
    has_assessment = user.get("latest_assessment") is not None

    return jsonify({
        "status": "ok",
        "has_profile": has_profile,
        "has_assessment": has_assessment,
        "domain": user.get("domain_interest", ""),
        "profile": {
            "name": user.get("name", ""),
            "domain_interest": user.get("domain_interest", "")
        } if has_profile else None
    })

@app.route('/onboarding', methods=['POST'])
def onboarding():
    data = request.json
    email = data.get('email', '').strip()
    if not email:
        return jsonify({"message": "Email is required"}), 400

    # GitHub scanning
    github_url = data.get('github', '').strip()
    github_data = scan_github(github_url) if github_url else {
        "repo_count": 0, "followers": 0, "github_score": 0, "username": ""
    }

    # LinkedIn bonus (5 points for providing it)
    linkedin_score = 5 if data.get('linkedin', '').strip() else 0

    skills = data.get('skills', [])
    if isinstance(skills, str):
        skills = [s.strip() for s in skills.split(',') if s.strip()]

    user_data = {
        "name": data.get("name", "").strip(),
        "college": data.get("college", "").strip(),
        "degree": data.get("degree", "").strip(),
        "year": data.get("year", ""),
        "skills": skills,
        "experience_level": data.get("experience_level", ""),
        "projects": data.get("projects", "").strip(),
        "domain_interest": data.get("domain", ""),
        "goal": data.get("goal", ""),
        "github": github_url,
        "linkedin": data.get("linkedin", "").strip(),
        "github_data": github_data,
        "linkedin_score": linkedin_score,
        "self_rating": {
            "coding": int(data.get("coding", 1)),
            "debugging": int(data.get("debugging", 1)),
            "problem_solving": int(data.get("problem_solving", 1))
        },
        "learning_style": data.get("learning_style", ""),
        "daily_hours": data.get("daily_hours", ""),
        "profile_completed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    users_col.update_one({"email": email}, {"$set": user_data}, upsert=True)
    return jsonify({
        "message": "Profile saved successfully",
        "github_data": github_data,
        "linkedin_score": linkedin_score
    })

@app.route('/get_questions', methods=['GET'])
def get_questions():
    domain = request.args.get('domain', 'Backend Development')
    normalized = normalize_domain(domain)
    questions = QUESTION_BANK.get(normalized, QUESTION_BANK['Backend Development'])
    return jsonify(questions)

@app.route('/submit-assessment', methods=['POST'])
def submit_assessment():
    try:
        data = request.json
        user_email = data.get('email', '').strip()
        user_answers = data.get('answers', {})
        domain = normalize_domain(data.get('domain', 'Backend Development'))

        questions = QUESTION_BANK.get(domain, QUESTION_BANK['Backend Development'])

        score = 0
        weak_areas = []
        strong_areas = []

        for q in questions:
            qid = str(q["id"])
            correct = str(q["answer"]).strip()
            user_ans = str(user_answers.get(qid, "")).strip()
            if user_ans == correct:
                score += 1
                strong_areas.append(q.get("topic", q["question"]))
            else:
                weak_areas.append(q.get("topic", q["question"]))

        total = len(questions)
        percentage = (score / total) * 100

        if percentage < 40:
            level = "Beginner"
        elif percentage < 70:
            level = "Intermediate"
        else:
            level = "Advanced"

        domain_recs = {
            "Frontend Development": {
                "Beginner": "Master HTML, CSS & JS Basics",
                "Intermediate": "Build React Projects with APIs",
                "Advanced": "Performance Optimization & System Design"
            },
            "Backend Development": {
                "Beginner": "Start with Python & Core Programming",
                "Intermediate": "REST APIs + Database Integration",
                "Advanced": "Microservices & Distributed Systems"
            },
            "AIML": {
                "Beginner": "Python + Math Foundations for ML",
                "Intermediate": "ML Algorithms & End-to-End Projects",
                "Advanced": "Deep Learning, MLOps & Research"
            }
        }
        recommended_domain = domain_recs.get(domain, domain_recs["Backend Development"]).get(level, "Continue Learning")

        # Get user profile for composite score
        user = users_col.find_one({"email": user_email})
        github_score = user.get("github_data", {}).get("github_score", 0) if user else 0
        linkedin_score = user.get("linkedin_score", 0) if user else 0
        self_rating = user.get("self_rating", {}) if user else {}
        coding_r = int(self_rating.get("coding", 1))
        debug_r  = int(self_rating.get("debugging", 1))
        ps_r     = int(self_rating.get("problem_solving", 1))
        self_score_pct = ((coding_r + debug_r + ps_r) / 15) * 100

        # Weighted overall score
        quiz_weight      = 0.55
        self_weight      = 0.20
        portfolio_weight = 0.25
        portfolio_score  = min(100, ((github_score + linkedin_score) / 35) * 100)
        overall_score    = round(
            percentage * quiz_weight +
            self_score_pct * self_weight +
            portfolio_score * portfolio_weight
        )

        result = {
            "email": user_email,
            "score": score,
            "total": total,
            "percentage": percentage,
            "level": level,
            "domain": domain,
            "recommended_domain": recommended_domain,
            "strong_areas": strong_areas,
            "weak_areas": weak_areas,
            "github_score": github_score,
            "overall_score": overall_score,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        # Gemini AI analysis
        if user:
            user_for_gemini = dict(user)
            user_for_gemini["latest_assessment"] = result
            ai_analysis = generate_gemini_analysis(user_for_gemini)
            if ai_analysis:
                result["ai_analysis"] = ai_analysis

        users_col.update_one(
            {"email": user_email},
            {"$set": {"latest_assessment": result}},
            upsert=True
        )

        return jsonify(result)

    except Exception as e:
        print(f"Error in submit_assessment: {e}")
        return jsonify({"message": "Server error", "error": str(e)}), 500

@app.route('/generate_tasks', methods=['POST'])
def generate_tasks():
    data = request.json
    email = data.get('email', '').strip()
    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    assessment = user.get("latest_assessment", {})
    domain = assessment.get("domain", "Backend Development")
    weak_areas = assessment.get("weak_areas", [])

    # Deduplicate topics, preserve order
    unique_topics = list(dict.fromkeys(weak_areas))

    existing_tasks = user.get("learning_tasks", [])
    existing_topics = {t["topic"] for t in existing_tasks}

    # Only generate tasks for topics that don't already have one (preserves progress on retake)
    new_topics = [t for t in unique_topics if t not in existing_topics]

    new_tasks = []
    for topic in new_topics:
        video = search_youtube_video(topic)
        task = {
            "id": f"task_{len(existing_tasks) + len(new_tasks) + 1}",
            "topic": topic,
            "domain": domain,
            "video": video,
            "challenge": generate_challenge(topic, domain),
            "status": "pending",
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "completed_at": None
        }
        new_tasks.append(task)

    all_tasks = existing_tasks + new_tasks
    users_col.update_one({"email": email}, {"$set": {"learning_tasks": all_tasks}})

    return jsonify({
        "message": f"{len(new_tasks)} new task(s) generated",
        "tasks": all_tasks
    })

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    email = request.args.get('email', '').strip()
    if not email:
        return jsonify({"error": "Email required"}), 400
    user = users_col.find_one({"email": email}, {"_id": 0, "learning_tasks": 1})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"tasks": user.get("learning_tasks", [])})

@app.route('/update_task_status', methods=['POST'])
def update_task_status():
    data = request.json
    email = data.get('email', '').strip()
    task_id = data.get('task_id', '').strip()
    status = data.get('status', '').strip()

    if not email or not task_id or status not in ("pending", "in_progress", "completed"):
        return jsonify({"message": "email, task_id, and a valid status are required"}), 400

    user = users_col.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    tasks = user.get("learning_tasks", [])
    found = False
    for t in tasks:
        if t["id"] == task_id:
            t["status"] = status
            t["completed_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S") if status == "completed" else None
            found = True
            break

    if not found:
        return jsonify({"message": "Task not found"}), 404

    users_col.update_one({"email": email}, {"$set": {"learning_tasks": tasks}})
    return jsonify({"message": "Task updated", "tasks": tasks})

@app.route('/get_dashboard', methods=['GET'])
def get_dashboard():
    email = request.args.get('email', '').strip()
    if not email:
        return jsonify({"error": "Email required"}), 400
    user = users_col.find_one({"email": email}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)
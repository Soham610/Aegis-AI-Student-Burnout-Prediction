from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import os

# Import student blueprint
from routes_student import student_bp

app = Flask(__name__)

CORS(app)

# Load model & scaler
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# In-memory storage (temporary)
students_db = []

def insert_student(student):
    students_db.append(student)

# Inject dependencies into blueprint
student_bp.model = model
student_bp.scaler = scaler
student_bp.insert_student = insert_student

# Register blueprint
app.register_blueprint(student_bp)

@app.route("/")
def home():
    return "Backend Running 🚀"

@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    total = len(students_db)
    high_risk = len([s for s in students_db if s["risk_level"] == "High Risk"])

    percentage = 0
    if total > 0:
        percentage = round((high_risk / total) * 100, 2)

    return jsonify({
        "total_students": total,
        "high_risk_count": high_risk,
        "high_risk_percentage": percentage
    })

@app.route("/admin/students", methods=["GET"])
def admin_students():
    return jsonify(students_db)

@app.route("/admin/feature-importance", methods=["GET"])
def feature_importance():
    return jsonify([
        {"feature": "attendance", "importance": 0.25},
        {"feature": "assignment_completion", "importance": 0.20},
        {"feature": "sleep_hours", "importance": 0.15},
        {"feature": "stress_level", "importance": 0.18},
        {"feature": "screen_time", "importance": 0.10},
        {"feature": "cgpa", "importance": 0.12},
    ])

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True)

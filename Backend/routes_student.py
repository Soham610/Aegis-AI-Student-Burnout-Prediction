from flask import Blueprint, request, jsonify
import numpy as np
from utils import generate_recommendations, classify_risk

student_bp = Blueprint("student_bp", __name__)



@student_bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        required_fields = [
            "roll_no",
            "name",
            "attendance",
            "assignment_completion",
            "sleep_hours",
            "stress_level",
            "screen_time",
            "cgpa"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        features = np.array([[
            float(data["attendance"]),
            float(data["assignment_completion"]),
            float(data["sleep_hours"]),
            float(data["stress_level"]),
            float(data["screen_time"]),
            float(data["cgpa"])
        ]])

        scaled = student_bp.scaler.transform(features)
        prob = student_bp.model.predict_proba(scaled)[0][1] * 100
        prob = round(prob, 2)

        risk_level = classify_risk(prob)
        recommendations = generate_recommendations({
            "attendance": float(data["attendance"]),
            "assignment_completion": float(data["assignment_completion"]),
            "sleep_hours": float(data["sleep_hours"]),
            "stress_level": float(data["stress_level"]),
            "screen_time": float(data["screen_time"]),
            "cgpa": float(data["cgpa"])
        })

        student_record = {
            "roll_no": data["roll_no"],
            "name": data["name"],
            "risk_probability": prob,
            "risk_level": risk_level
        }

        student_bp.insert_student(student_record)

        return jsonify({
            "risk_probability": prob,
            "risk_level": risk_level,
            "recommendations": recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
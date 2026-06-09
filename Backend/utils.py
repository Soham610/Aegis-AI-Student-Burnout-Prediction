# backend/utils.py

import numpy as np

import numpy as np

def generate_recommendations(data):

    # Convert everything to float FIRST
    attendance = float(data["attendance"])
    assignment_completion = float(data["assignment_completion"])
    sleep_hours = float(data["sleep_hours"])
    stress_level = float(data["stress_level"])
    cgpa = float(data["cgpa"])

    issues = []

    if attendance < 40:
        issues.append((3, "Critical: Extremely low attendance. Immediate intervention required."))
    elif attendance < 60:
        issues.append((2, "Improve attendance and attend mentoring sessions."))

    if assignment_completion < 40:
        issues.append((3, "Critical: Assignments severely incomplete. Seek academic support."))
    elif assignment_completion < 60:
        issues.append((2, "Focus on completing assignments on time."))

    if sleep_hours < 4:
        issues.append((3, "Critical: Extremely low sleep affecting health and performance."))
    elif sleep_hours < 6:
        issues.append((2, "Improve sleep hygiene and maintain routine."))

    if stress_level == 5:
        issues.append((3, "Critical: Very high stress level. Immediate counseling recommended."))
    elif stress_level >= 4:
        issues.append((2, "Consider stress management counseling."))

    if cgpa < 4:
        issues.append((3, "Critical: Very low CGPA. Academic recovery plan required."))
    elif cgpa < 6:
        issues.append((2, "Seek academic guidance for improvement."))

    if not issues:
        return ["Student performance is stable. Maintain current habits."]

    issues.sort(reverse=True, key=lambda x: x[0])

    return [issue[1] for issue in issues[:3]]


def classify_risk(prob):
    if prob < 40:
        return "Low Risk"
    elif prob < 70:
        return "Medium Risk"
    else:
        return "High Risk"


def simulate_improvement(model, scaler, data):
    improved = data.copy()

    improved["attendance"] = min(improved["attendance"] + 10, 100)

    features = np.array([[ 
    float(improved["attendance"]),
    float(improved["assignment_completion"]),
    float(improved["sleep_hours"]),
    float(improved["stress_level"]),
    float(improved["screen_time"]),
    float(improved["cgpa"])
]])

    scaled = scaler.transform(features)
    new_prob = model.predict_proba(scaled)[0][1] * 100

    return round(new_prob, 2)
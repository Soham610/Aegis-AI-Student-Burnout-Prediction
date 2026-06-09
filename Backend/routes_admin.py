from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin_bp", __name__)

# These will be injected from app.py
get_admin_stats = None
get_risk_distribution = None
get_all_students = None
model = None
ADMIN_SECRET = None


# 🔐 Admin protection decorator
def admin_required(func):
    def wrapper(*args, **kwargs):
        secret = request.headers.get("x-admin-key")

        if secret != ADMIN_SECRET:
            return jsonify({"error": "Unauthorized"}), 401

        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    return wrapper


@admin_bp.route("/admin/stats", methods=["GET"])
@admin_required
def admin_stats():
    try:
        stats = get_admin_stats()
        distribution = get_risk_distribution()

        return jsonify({
            "stats": stats,
            "risk_distribution": distribution
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/admin/students", methods=["GET"])
@admin_required
def all_students():
    try:
        students = get_all_students()
        return jsonify(students)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@admin_bp.route("/admin/feature-importance", methods=["GET"])
@admin_required
def feature_importance():
    try:
        feature_names = [
            "attendance",
            "assignment_completion",
            "sleep_hours",
            "stress_level",
            "screen_time",
            "cgpa"
        ]

        coefficients = model.coef_[0]

        importance = []

        for name, coef in zip(feature_names, coefficients):
            importance.append({
                "feature": name,
                "importance": round(float(abs(coef)), 4)
            })

        return jsonify(
            sorted(importance, key=lambda x: x["importance"], reverse=True)
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500
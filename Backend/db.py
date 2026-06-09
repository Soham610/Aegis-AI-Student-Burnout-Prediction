import mysql.connector


# 🔹 1. Create connection function
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",              # change if needed
        password="mustafa123@", # change this
        database="student_risk"   # your DB name
    )


# 🔹 2. Insert student record
def insert_student(data):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO student_logs
    (roll_no, name, attendance, assignment_completion, sleep_hours,
     stress_level, screen_time, cgpa, risk_probability, risk_level)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        data["roll_no"],
        data["name"],
        data["attendance"],
        data["assignment_completion"],
        data["sleep_hours"],
        data["stress_level"],
        data["screen_time"],
        data["cgpa"],
        data["risk_probability"],
        data["risk_level"]
    )

    cursor.execute(query, values)
    connection.commit()

    cursor.close()
    connection.close()


# 🔹 3. Get admin stats
def get_admin_stats():
    connection = get_connection()
    cursor = connection.cursor()

    # total students
    cursor.execute("SELECT COUNT(*) FROM student_logs")
    total_students = cursor.fetchone()[0]

    # high risk count
    cursor.execute("SELECT COUNT(*) FROM student_logs WHERE risk_level = 'High'")
    high_risk = cursor.fetchone()[0]

    cursor.close()
    connection.close()

    return {
        "total_students": total_students,
        "high_risk_count": high_risk
    }


# 🔹 4. Get risk distribution
def get_risk_distribution():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT risk_level, COUNT(*)
        FROM student_logs
        GROUP BY risk_level
    """)

    results = cursor.fetchall()

    cursor.close()
    connection.close()

    distribution = {row[0]: row[1] for row in results}

    return distribution
# 🔹 5. Get all students
def get_all_students():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM student_logs"
    cursor.execute(query)

    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return results

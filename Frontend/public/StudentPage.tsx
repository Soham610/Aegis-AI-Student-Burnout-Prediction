import React, { useState } from "react";

interface StudentPageProps {
  onBack: () => void;
}

interface FormData {
  roll_no: string;
  name: string;
  attendance: string;
  assignment_completion: string;
  sleep_hours: string;
  stress_level: string;
  screen_time: string;
  cgpa: string;
}

export default function StudentPage({ onBack }: StudentPageProps) {
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState<FormData>({
    roll_no: "",
    name: "",
    attendance: "",
    assignment_completion: "",
    sleep_hours: "",
    stress_level: "",
    screen_time: "",
    cgpa: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  console.log("Button clicked");

  const payload = {
    roll_no: formData.roll_no,
    name: formData.name,
    attendance: Number(formData.attendance),
    assignment_completion: Number(formData.assignment_completion),
    sleep_hours: Number(formData.sleep_hours),
    stress_level: Number(formData.stress_level),
    screen_time: Number(formData.screen_time),
    cgpa: Number(formData.cgpa),
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", data);
    setResult(data);

  } catch (err) {
    console.error("Error:", err);
    alert("Backend not reachable!");
  }
};

  const fields: { label: string; name: keyof FormData }[] = [
    { label: "Roll No", name: "roll_no" },
    { label: "Name", name: "name" },
    { label: "Attendance", name: "attendance" },
    { label: "Assignment Completion", name: "assignment_completion" },
    { label: "Sleep Hours", name: "sleep_hours" },
    { label: "Stress Level", name: "stress_level" },
    { label: "Screen Time", name: "screen_time" },
    { label: "CGPA", name: "cgpa" },
  ];

  return (
  <div className="student-page">

    <div className="student-container">

      <button className="back-btn-modern" onClick={onBack}>
        ← Back
      </button>

      <div className="student-card">
        <h2 className="student-title">AI Risk Engine</h2>
        <p className="student-subtitle">
          Predict today. Protect tomorrow.
        </p>

        {fields.map((field, index) => (
          <div className="form-field" key={index}>
            <label>{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="button"
          className="generate-btn"
          onClick={handleSubmit}
        >
          Generate Predictive Report
        </button>

        {result && (
          <div className="result-card-advanced">
            <h3>Prediction Result</h3>

            <div className={`risk-box ${result.risk_level?.toLowerCase()}`}>
              {result.risk_level}
            </div>

            <p>
              <strong>Risk Probability:</strong>{" "}
              {result.risk_probability}%
            </p>

            <h4>Recommendations</h4>

            <ul>
              {result.recommendations &&
                Array.isArray(result.recommendations) &&
                result.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  </div>
);
}
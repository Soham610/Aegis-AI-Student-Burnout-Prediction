import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface DashboardProps {
  onBack: () => void;
}

interface Stats {
  total_students: number;
  high_risk_count: number;
  high_risk_percentage: number;
}

interface FeatureImportance {
  feature: string;
  importance: number;
}

interface Student {
  name: string;
  risk_level: string;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [importance, setImportance] = useState<FeatureImportance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
  const headers = {
    "x-admin-key": "aegis_admin_2026",
  };

  const fetchData = async () => {
    try {
      const statsRes = await fetch("http://127.0.0.1:5000/admin/stats", { headers });
      if (!statsRes.ok) throw new Error("Stats fetch failed");
      const statsData = await statsRes.json();
      setStats(statsData);

      const importanceRes = await fetch("http://127.0.0.1:5000/admin/feature-importance", { headers });
      if (!importanceRes.ok) throw new Error("Importance fetch failed");
      const importanceData = await importanceRes.json();
      setImportance(importanceData);

      const studentsRes = await fetch("http://127.0.0.1:5000/admin/students", { headers });
      if (!studentsRes.ok) throw new Error("Students fetch failed");
      const studentsData = await studentsRes.json();
      setStudents(studentsData);

    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  };

  fetchData();
}, []);

  if (!stats) {
    return <div className="admin-page">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* Stats */}
        <div className="admin-cards">
          <div className="admin-card">
            <h2>{stats.total_students}</h2>
            <p>Total Students</p>
          </div>

          <div className="admin-card">
            <h2>{stats.high_risk_count}</h2>
            <p>High Risk Students</p>
          </div>

          <div className="admin-card">
            <h2>{stats.high_risk_percentage}%</h2>
            <p>High Risk Percentage</p>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="admin-chart-card">
          <h3>Feature Importance</h3>

          <Bar
            data={{
              labels: importance.map((i) => i.feature),
              datasets: [
                {
                  label: "Importance Score",
                  data: importance.map((i) => i.importance),
                  backgroundColor: "#7A3FE0",
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } },
              },
            }}
          />
        </div>

        {/* Students */}
        <div className="admin-student-list">
          <h3>Student Risk Overview</h3>

          {students.map((s, index) => (
            <div key={index} className="admin-student-item">
              <span>{s.name}</span>

              <span
                className={`admin-risk-badge ${s.risk_level.toLowerCase()}`}
              >
                {s.risk_level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import LoginPage from "./LoginPage.tsx";
import StudentPage from "./StudentPage.tsx";
import Dashboard from "./Dashboard.tsx";
import "./styles.css";

export default function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <LoginPage onSelectRole={setRole} />;
  }

  return role === "student" ? (
    <StudentPage onBack={() => setRole(null)} />
  ) : (
    <Dashboard onBack={() => setRole(null)} />
  );
}



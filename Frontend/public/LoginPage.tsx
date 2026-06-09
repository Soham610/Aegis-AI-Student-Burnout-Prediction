import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function LoginPage({ onSelectRole }) {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <h1>Protection Through Prediction</h1>

            <p className="hero-subtext">
              An AI-powered early warning system enabling institutions to
              proactively identify academic burnout and dropout risk.
            </p>

            <div className="hero-buttons">
              <div
                className="hero-card"
                onClick={() => onSelectRole("student")}
              >
                <h3>Student Portal</h3>
                <p>Run predictive risk analysis</p>
              </div>

              <div className="hero-card" onClick={() => onSelectRole("admin")}>
                <h3>Admin Dashboard</h3>
                <p>Institution-wide monitoring</p>
              </div>
            </div>
          </div>

          <div className="hero-right-image"></div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <h2>
          “Prevention is not an expense. It is an investment in the future.”
        </h2>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Why Aegis?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h4>AI Risk Intelligence</h4>
            <p>
              Machine learning model trained to detect early academic risk
              signals.
            </p>
          </div>

          <div className="feature-card">
            <h4>Real-Time Monitoring</h4>
            <p>Dashboard providing live institutional risk distribution.</p>
          </div>

          <div className="feature-card">
            <h4>Preventive Intervention</h4>
            <p>Actionable recommendations before problems escalate.</p>
          </div>

          <div className="feature-card">
            <h4>Institution Scale Ready</h4>
            <p>Designed for deployment across universities and colleges.</p>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <h3>90%</h3>
            <p>Prediction Accuracy</p>
          </div>
          <div className="stat-box">
            <h3>3x</h3>
            <p>Faster Intervention</p>
          </div>
          <div className="stat-box">
            <h3>100+</h3>
            <p>Students Analyzed</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import "./PredictionForm.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    description: "",
    external_url: false,
    private: false,
    posts: "",
    followers: "",
    follows: "",
  });

  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="main-container">
      <div className="overlay"></div>

      <div className="content-wrapper">

        {/* LEFT */}
        <div className="left-section">
          <h1>Instagram Fake Account Detector</h1>

          <p className="subtitle">
            AI-powered system for detecting suspicious Instagram accounts.
          </p>

          <div className="feature-boxes">
            <div className="feature-card">
              <h3>AI Detection</h3>
              <p>Machine learning based prediction system</p>
            </div>

            <div className="feature-card">
              <h3>Behavior Analysis</h3>
              <p>Detects suspicious social activity patterns</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-section">

          <form className="prediction-form" onSubmit={handleSubmit}>

            <h2>Analyze Profile</h2>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Enter Bio / Description"
              onChange={handleChange}
            />

            <input
              type="number"
              name="posts"
              placeholder="Number of Posts"
              onChange={handleChange}
              min="0"
              required
            />

            <input
              type="number"
              name="followers"
              placeholder="Followers"
              onChange={handleChange}
              min="0"
              required
            />

            <input
              type="number"
              name="follows"
              placeholder="Following"
              onChange={handleChange}
              min="0"
              required
            />

            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="external_url" onChange={handleChange} />
                Has External URL
              </label>

              <label>
                <input type="checkbox" name="private" onChange={handleChange} />
                Private Account
              </label>
            </div>

            <button type="submit">
              {loading ? "Analyzing..." : "Predict Account"}
            </button>

            {/* RESULT */}
            {result && (
              <div className="result-box">

                <h3>
                  Prediction:
                  <span className={result === "Fake" ? "fake-text" : "real-text"}>
                    {result}
                  </span>
                </h3>

                {/* PIE CHART */}
                <div className="chart-container">
                  <PieChart
                    data={[
                      {
                        title: "Confidence",
                        value: confidence,
                        color: result === "Fake" ? "#f43f5e" : "#22c55e",
                      },
                      {
                        title: "Uncertainty",
                        value: 100 - confidence,
                        color: "#334155",
                      },
                    ]}
                    lineWidth={18}
                    rounded
                    animate
                  />
                  <div className="chart-label">
                    {confidence}% Confidence
                  </div>
                </div>

              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
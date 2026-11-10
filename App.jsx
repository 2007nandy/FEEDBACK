
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Replace this with your actual Render backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/feedback`
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error getting feedback:", error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_URL}/api/feedback`,
        feedback
      );

      alert("Feedback submitted successfully!");

      setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });

      getFeedbacks();

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="page">

      <div className="container">

        <h1>Feedback Form</h1>
        <p className="subtitle">
          Share your valuable feedback and suggestions
        </p>

        <form onSubmit={handleSubmit} className="feedback-form">

          <label>Name:</label>
          <input
            type="text"
            name="q1"
            placeholder="Enter your name"
            value={feedback.q1}
            onChange={handleChange}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            name="q2"
            placeholder="Enter your department"
            value={feedback.q2}
            onChange={handleChange}
            required
          />

          <label>Session Title:</label>
          <input
            type="text"
            name="q3"
            placeholder="Enter session title"
            value={feedback.q3}
            onChange={handleChange}
            required
          />

          <label>Feedback:</label>
          <textarea
            name="q4"
            placeholder="Write your feedback"
            value={feedback.q4}
            onChange={handleChange}
            required
          />

          <label>Suggestions:</label>
          <textarea
            name="q5"
            placeholder="Enter your suggestions"
            value={feedback.q5}
            onChange={handleChange}
          />

          <button type="submit">
            Submit Feedback
          </button>

        </form>

      </div>

      <div className="feedback-list">

        <h2>Submitted Feedback</h2>

        {feedbacks.length === 0 ? (
          <p className="empty-message">
            No feedback submitted yet.
          </p>
        ) : (

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Session Title</th>
                  <th>Feedback</th>
                  <th>Suggestions</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item.q1}</td>
                    <td>{item.q2}</td>
                    <td>{item.q3}</td>
                    <td>{item.q4}</td>
                    <td>{item.q5}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;

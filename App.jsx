
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const emptyFeedback = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  };

  const [feedback, setFeedback] = useState(emptyFeedback);
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
      if (editingId) {
        await axios.put(
          `${API_URL}/api/feedback/${editingId}`,
          feedback
        );

        alert("Feedback updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(
          `${API_URL}/api/feedback`,
          feedback
        );

        alert("Feedback submitted successfully!");
      }

      setFeedback(emptyFeedback);
      await getFeedbacks();

    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback.");
    }
  };

  // Edit feedback
  const handleEdit = (item) => {
    setFeedback({
      q1: item.q1 || "",
      q2: item.q2 || "",
      q3: item.q3 || "",
      q4: item.q4 || "",
      q5: item.q5 || "",
    });

    setEditingId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setFeedback(emptyFeedback);
    setEditingId(null);
  };

  // Delete feedback
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/feedback/${id}`
      );

      alert("Feedback deleted successfully!");

      if (editingId === id) {
        handleCancel();
      }

      await getFeedbacks();

    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback.");
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
            value={feedback.q1}
            onChange={handleChange}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            name="q2"
            value={feedback.q2}
            onChange={handleChange}
            required
          />

          <label>Session Title:</label>
          <input
            type="text"
            name="q3"
            value={feedback.q3}
            onChange={handleChange}
            required
          />

          <label>Feedback:</label>
          <textarea
            name="q4"
            value={feedback.q4}
            onChange={handleChange}
            required
          />

          <label>Suggestions:</label>
          <textarea
            name="q5"
            value={feedback.q5}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Feedback" : "Submit Feedback"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel Edit
            </button>
          )}

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
                  <th>Actions</th>
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

                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
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

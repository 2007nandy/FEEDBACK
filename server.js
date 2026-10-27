const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let feedbacks = [];

// Default route
app.get("/", (req, res) => {
  res.send("Feedback Server Running");
});

// Get all feedbacks
app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

// Submit feedback
app.post("/api/feedback", (req, res) => {
  const feedbackData = req.body;

  feedbacks.push(feedbackData);

  console.log("Received Feedback:", feedbackData);

  res.status(200).json({
    message: "Feedback submitted successfully!",
    feedback: feedbackData
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
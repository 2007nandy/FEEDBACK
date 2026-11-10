const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let feedbacks = [];

app.get("/", (req, res) => {
  res.send("Feedback Server Running");
});

app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});
app.post("/api/feedback", (req, res) => {
  const feedbackData = req.body;

  feedbacks.push(feedbackData);

  console.log("Received Feedback:", feedbackData);

  res.status(200).json({
    message: "Feedback submitted successfully!",
    feedback: feedbackData
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

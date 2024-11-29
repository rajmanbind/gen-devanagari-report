const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajmanbind3535:6v7JRFnElzLzYH4l@cluster0.7kmz1.mongodb.net/devnagari?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
connectDB();
// Create a schema for the report
const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Report = mongoose.model("Report", reportSchema);

// Endpoint to get the report
app.get("/api/reports", async (req, res) => {
  try {
    const report = await Report.find();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to create a report
app.post("/api/reports", async (req, res) => {
  const { title, content } = req.body;
  const newReport = new Report({
    title,
    content,
  });

  try {
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// proxy/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// app.post("/api/chat", async (req, res) => {
//   try {
//     // Forward the request to the Python chatbot backend
//     const response = await axios.post("http://localhost:5000/chat", req.body);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error connecting to chatbot API" });
//   }
// });
// app.post("/api/chat", async (req, res) => {
//   try {
//     const response = await axios.post("https://personal-portfolio-yqy1.onrender.com", req.body);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error in proxy:", error);
//     res.status(500).json({ error: "Error connecting to chatbot API" });
//   }
// });
app.post("/api/chat", async (req, res) => {
  try {
    console.log("📨 Proxy received:", req.body);
    const response = await axios.post("https://personal-portfolio-yqy1.onrender.com/chat", req.body);
    console.log("✅ Got response from backend:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error in proxy:", error?.response?.data || error.message);
    res.status(500).json({ error: "Error connecting to chatbot API" });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

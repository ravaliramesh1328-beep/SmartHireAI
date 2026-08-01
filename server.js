const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const resumeRoutes = require("./routes/resume");
const screeningRoutes = require("./routes/screening");
const liveJobsRoutes = require("./routes/livejobs");

console.log("Screening route file:", require.resolve("./routes/screening"));
console.log("Job routes imported:", jobRoutes);

const http = require("http");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/screening", screeningRoutes);
app.use("/api/livejobs", liveJobsRoutes);
app.get("/api/test", (req, res) => {
    res.send("API OK");
});
console.log(
  screeningRoutes.stack.map(layer => ({
    path: layer.route?.path,
    methods: layer.route?.methods
  }))
);
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
});

app.get("/", (req, res) => {
    res.send("SmartHire AI Server Running...");
});

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

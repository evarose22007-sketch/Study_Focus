const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const app = express();
// MW //
app.use(cors());
app.use(express.json());
app.use("/sessions", sessionRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/settings", settingsRoutes);
// Test //
app.get("/", (req, res) => {
    res.send("Backend is Running!");
});
// Port //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
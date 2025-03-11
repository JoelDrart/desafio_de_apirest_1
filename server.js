require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/projects", require("./routes/projects"));
// app.use("/api/tasks", require("./routes/tasks")); //va en projects
// app.use("/api/comments", require("./routes/comments"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
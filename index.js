const express = require("express");
const DBConnection = require("./DB/connection.js");

const User = require("./models/user.js");
const Session = require("./models/sessions.js");

const app = express();

DBConnection();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({ username, password });
  if (!userData) {
    return res
      .status(401)
      .json({ userLoggedIn: false, message: "Invalid credentials" });
  }
  if (userData.username === username && userData.password === password) {
    res.status(200).json({ userLoggedIn: true, message: "Login successful" });
  } else {
    res
      .status(401)
      .json({ userLoggedIn: false, message: "Invalid credentials" });
  }
});

app.post("/session", async (req, res) => {
  const data = req.body;
  const session = await new Session(data);
  const save_session = await session.save();
  if (save_session) {
    res.status(200).send("Session created successfully");
  } else {
    res.status(500).send("Error creating session");
  }
});

app.get("/session", async (req, res) => {
  const session = await Session.findOne().sort({ createdAt: -1 });
  if (session) {
    res
      .status(200)
      .json({ data: session, message: "Session get successfully" });
  } else {
    res.status(500).send("Error creating session");
  }
});

// PUT: Full update or PATCH: Partial update
app.put("/session/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedSession = await Session.findByIdAndUpdate(id, data, {
      new: true, // return the updated document
      runValidators: true, // validate data based on schema
    });

    if (updatedSession) {
      res.status(200).send("Session updated successfully");
    } else {
      res.status(404).send("Session not found");
    }
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).send("Error updating session");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

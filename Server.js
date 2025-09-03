import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://pranavsubburaj_db_user:123456Pranav@cluster0.vuifioz.mongodb.net/quizMaster?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);


app.post("/users/score", async (req, res) => {
  const { name, score } = req.body;
  if (!name || score == null) {
    return res.status(400).json({ message: "Name and score are required" });
  }

  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name, score });
    } else {
      user.score = Math.max(user.score, score);
    }

    await user.save();
    res.status(201).json({ message: "User score saved", user });
  } catch (err) {
    res.status(500).json({ message: "Error saving score", error: err.message });
  }
});

app.get("/users/leaderboard", async (_, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json({ message: "Leaderboard fetched", users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://pranavsubburaj_db_user:123456Pranav@cluster0.vuifioz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

app.post("/users/score", async (req, res) => {
  const { name, score } = req.body;
  if (!name || score == null) return res.status(400).json({ message: "Name and score required" });

  try {
    let user = await User.findOne({ name });
    if (!user) user = new User({ name, score });
    else user.score = score;

    await user.save();
    res.status(201).json({ message: "User score saved", user });
  } catch (err) {
    res.status(500).json({ message: "Error saving score", err });
  }
});

app.get("/users/leaderboard", async (_, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", err });
  }
});

app.listen(PORT, () => console.log(`Server running...`));

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

mongoose.connect("mongodb+srv://hammadalamgir778:hammad778@cluster0.kotj8fj.mongodb.net/userapp?retryWrites=true&w=majority&appName=Cluster0")

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signin', async function (req, res) {
  const { username, password, name } = req.body;

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  let newUser = new User({
    name: name,
    username: username,
    password: password,
  });

  await newUser.save();
  res.json({ "msg": "User created successfully" });
});

app.post('/login', async function (req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user.password !== password) {
    return res.status(400).send("Incorrect password");
  }

  res.json({ "msg": "Login successful" });
});

// New endpoint to update the password
app.patch('/update-password', async function (req, res) {
  const { username, newPassword } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).send("User not found");
  }

  user.password = newPassword;
  await user.save();

  res.json({ "msg": "Password updated successfully" });
});

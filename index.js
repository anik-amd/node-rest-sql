const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(newUser);
});

app.listen(3000, () => console.log("Server is running on port 3000"));

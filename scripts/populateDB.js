import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// Connect to the local database.
mongoose
  .connect("mongodb://localhost:27017/ticketing-db")
  .then(() => console.log("💾 Connected to DB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB", err));

const users = [
  { name: "user", role: "user", email: "user@email.com", password: "12345678" },
  {
    name: "admin",
    role: "admin",
    email: "admin@email.com",
    password: "12345678",
  },
];
const status = ["open", "closed"];
const priorities = ["high", "medium", "low"];

async function deleteCollections() {
  await User.deleteMany({});
  console.log("🗑️ Users collection deleted");
  await Ticket.deleteMany({});
  console.log("🗑️ Tickets collection deleted");
}

async function createUsers() {
  for (const userData of users) {
    const user = new User(userData);
    await user.save();
  }
}

async function createTickets() {
  const users = await User.find({});

  for (let i = 0; i < 15; i++) {
    const ticket = new Ticket({
      title: `Ticket #${i}`,
      description: `This is a description for Ticket #${i}`,
      status: status[Math.floor(Math.random() * status.length)],
      priorities: priorities[Math.floor(Math.random() * priorities.length)],
      user: users[Math.floor(Math.random() * users.length)].id,
    });

    await ticket.save();
  }
}

async function populateDB() {
  await deleteCollections();
  await createUsers();
  await createTickets();
  console.log("🚀 Database populated");
  mongoose.disconnect();
}

populateDB();

import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "https://last-project-notes.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 👇 Tambahkan ini (penting, untuk pastikan header lama dihapus)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://last-project-notes.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 👇 Tambahkan juga ini untuk handle preflight request OPTIONS
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/", helloRouter);
app.use(notesRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  testConnection();
});

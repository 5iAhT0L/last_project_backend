import express from "express";
import cors from "cors";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";

const app = express();

// ✅ Allow main + preview Vercel domains
const allowedOrigins = [
  "https://last-project-notes.vercel.app",
  /\.vercel\.app$/, // allow all vercel.app subdomains
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.some((allowed) =>
        allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 🟢 Apply CORS globally (including preflight)
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// ✅ Manual fallback CORS — ensures header always sent
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Routers
app.use("/", helloRouter);
app.use(notesRouter);

// 🧠 Test DB connection once on cold start (Vercel build time)
testConnection()
  .then(() => console.log("✅ Database connection established successfully."))
  .catch((err) => console.error("❌ Database connection failed:", err));

// ⚡ Export app for Vercel serverless handler
export default app;

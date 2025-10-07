import express from "express";
import cors from "cors";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";

const app = express();

// ✅ Panggil testConnection untuk memastikan koneksi DB aktif
testConnection();

// ✅ Izinkan domain frontend kamu + semua subdomain vercel
const allowedOrigins = [
  "https://last-project-notes.vercel.app",
  /\.vercel\.app$/,
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
      console.log("❌ CORS blocked request from:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS)
app.options("*", cors(corsOptions));

// ✅ Tambahkan manual fallback header
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    req.headers.origin || "https://last-project-notes.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// ✅ Routes
app.use("/", helloRouter);
app.use(notesRouter);

// ✅ Export untuk vercel
export default app;

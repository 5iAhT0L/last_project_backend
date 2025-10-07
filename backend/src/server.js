import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";
import cors from "cors";

const app = express();

// ✅ Izinkan domain utama + preview URL dari Vercel
const allowedOrigins = [
  "https://last-project-notes.vercel.app",
  /\.vercel\.app$/ // regex: izinkan semua subdomain vercel.app
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-side tools
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
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/", helloRouter);
app.use(notesRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  testConnection();
});

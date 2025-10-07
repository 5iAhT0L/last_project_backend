import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "https://last-project-notes.vercel.app/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
const port = 3000;

app.use(express.json());

app.use("/", helloRouter);
app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});

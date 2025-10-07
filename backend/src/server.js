import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.use("/", helloRouter);
app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});

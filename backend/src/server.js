import express from "express";
import { testConnection } from "./config/db.js";
import helloRouter from "./route/helloRoute.js";
import notesRouter from "./route/notesRoute.js";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/", helloRouter);
app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});

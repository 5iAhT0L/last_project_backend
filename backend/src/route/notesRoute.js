import express from "express";
import {
  getAllNotesHandler,
  addNoteHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler,
} from "../handlers/notesHandler.js";

const notesRouter = express.Router();

notesRouter.get("/notes", getAllNotesHandler);
notesRouter.put("/notes/:id", updateNoteHandler);
notesRouter.get("/notes/:id", getNoteByIdHandler);
notesRouter.post("/notes", addNoteHandler);
notesRouter.delete("/notes/:id", deleteNoteHandler);

export default notesRouter;

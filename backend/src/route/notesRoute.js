import express from "express";
import { getAllNotesHandler, addNoteHandler, getNoteByIdHandler } from "../handlers/notesHandler.js";

const notesRouter = express.Router();

notesRouter.get("/notes", getAllNotesHandler);
notesRouter.post("/notes", addNoteHandler);
notesRouter.get("/notes/:id", getNoteByIdHandler);

export default notesRouter;

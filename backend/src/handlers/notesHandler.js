import { pool } from "../config/db.js";

export const getAllNotesHandler = async (req, res) => {
  const [notes] = await pool.query("SELECT * FROM notes");

  res.status(200).json({
    message: "All notes retrieved successfully",
    data: notes,
  });
};

export const addNoteHandler = async (req, res) => {
  const { title, content } = req.body;

  const [insertResult] = await pool.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  res.status(201).json({
    status: "success",
    message: "Note added successfully",
  });
};

export const getNoteByIdHandler = async (req, res) => {
  const { id } = req.params;

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (!notes) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({
    message: "Note retrieved successfully",
    data: notes[0],
  });
};

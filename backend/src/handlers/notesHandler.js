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

  const [result] = await pool.query("SELECT * FROM notes WHERE id = ?", [
    insertResult.insertId,
  ]);

  if (!result) {
    return res.status(404).json({ message: "Note not found after insertion" });
  }

  res.status(201).json({
    status: "success",
    message: "Note added successfully",
    data: result[0],
  });
};

export const updateNoteHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const [result] = await pool.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Note updated successfully",
    data: result[0],
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

export const deleteNoteHandler = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("DELETE FROM notes WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
  });
};
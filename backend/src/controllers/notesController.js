import Note from "../model/Notes.js";
import mongoose from "mongoose";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (e) {
    res.status(500).json({ message: "Error fetching notes", error: e });
  }
}

export async function createNotes(req, res) {
  try {
    const description = req.body.description;
    const title = req.body.title;
    const note = await Note.create({ description, title });
    res.status(201).json({ message: "Note created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error fetching notes", e });
    console.log(e);
  }
}
export async function updateNotes(req, res) {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    const updatedNote = await Note.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Note", error });
  }
}
export async function deleteNotes(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Note", error });
  }
}
export async function getNote(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    const note = await Note.findById(id);
    if (!note) {
      res.status(404);
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Note", error });
  }
}

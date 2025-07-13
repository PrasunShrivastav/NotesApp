import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";

import { formatDate } from "../lib/utils";
const NoteCard = ({ note, setNotes }) => {
  async function deleteNote(e, id) {
    e.preventDefault();
    console.log("hi from deleteNote");
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("The Note has been deleted");
      setNotes((prev) => prev.filter((note) => note._id !== id)
      )
    } catch (error) {
      console.error(error);
      toast.error("Failed to the note");
    }
  }
  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#85b0ef]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                deleteNote(e, note._id);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

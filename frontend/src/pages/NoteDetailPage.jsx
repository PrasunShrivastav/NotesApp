import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api"

const NoteDetailPage = () => {
  const [note, setNotes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function getNote() {
      try {
        const res = await api.get(`/notes/${id}`);
        setNotes(res.data);
        console.log(res.data)
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    }
    getNote();
  }, [])
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (<div>

  </div>);
};

export default NoteDetailPage;

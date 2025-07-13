import { useEffect, useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        console.log(response.data);
        setNotes(response.data);
        setRateLimited(false);
      } catch (error) {
        console.log(error);
        if (error.response.status == 404) {
          setRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimited />}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        {isLoading && (
          <div className="text-center text-primary py-10 flex flex-col items-center">
            Loading Notes....
            <Loader className="size-10 text-primary " />
          </div>
        )}
      </div>
      {!isLoading && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

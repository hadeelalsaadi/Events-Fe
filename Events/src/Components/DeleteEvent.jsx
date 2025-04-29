
import { useState } from "react";
import { deleteEvent } from "../api";

export const DeleteEvent = ({ event_id, onDelete , user}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    if (!user) {
      alert("Please log in to delete events.");
      return;
    }

    if (user.user_role !== "admin") {
      alert("You must be an admin to delete events.");
      return;
    }
   
    setLoading(true);
    deleteEvent(event_id)
      .then(() => {
        setMessage("Event deleted!");
        setError("");
        onDelete(event_id); 
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete event. Please try again.");
        setMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

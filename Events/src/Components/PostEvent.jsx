import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { AddeventForm } from "./AddEventForm"
import { addEvent } from "../api"

export const PostEvent =()=>{
    const{user} =useContext(UserContext)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");
    const handleAddEventSubmit=(eventDetails)=>{
        if (!user) {
            alert("You must be logged in to post an item!");
            return;
        }
        addEvent(eventDetails)
        .then(()=>{
            setMessage("Item Posted Successfully!");
            setError("");
        }) .catch((err) => {
            console.error(err);
            setError("Failed to post item. Please try again.");
            setMessage("");
          });

    }
  
    return (
        <section>
            <h2>Post Event</h2>
            <AddeventForm onSubmit={handleAddEventSubmit} user={user}/>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

       
        </section>
    )
}
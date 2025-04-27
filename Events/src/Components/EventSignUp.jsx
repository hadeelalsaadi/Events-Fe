import { useState } from "react";
import { addEventToCalendar, signIn } from "../services/googleCalender";
import { postAttendee } from "../api";

export const EventSignUp = ({ event, user }) => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const attendee = {
        user_id: user.user_id,
        event_id: event.event_id
    }
  
    const handleAddToCalendar = async () => {
      try {
        await signIn(); 
  
        const eventData = {
          summary: event.title,
          description: event.description,
          start: {
            dateTime: event.start_time,
            timeZone: event.timezone || "UTC",
          },
          end: {
            dateTime: event.end_time,
            timeZone: event.timezone || "UTC",
          },
        };
  
        const response = await addEventToCalendar(eventData);
        console.log("Event created:", response);
        alert("Event added to your calendar!");
      } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add event to Google Calendar.");
      }
    };
  
    const handleSignUp = async () => {
      try {
        if (isSignedUp) {
          alert("You're already signed up!");
          return;
        }
  
        await postAttendee(attendee)
  
        setIsSignedUp(true);
        alert("Signed up for the event!");
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Failed to sign up for the event.");
      }
    };
  
    const handleButtonClick = async () => {
      await handleAddToCalendar();
      await handleSignUp();
    };
  
    return (
      <button onClick={handleButtonClick} disabled={isSignedUp}>
        {isSignedUp ? "Signed Up!" : "Sign up for event"}
      </button>
    );
  };
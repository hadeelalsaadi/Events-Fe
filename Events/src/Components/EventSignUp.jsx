import { useState } from "react";
import { addEventToCalendar, signIn, isSignedIn } from "../services/googleCalender";
import { postAttendee } from "../api";

export const EventSignUp = ({ event, user }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState(null);
  
  const attendee = {
    user_id: user?.user_id,
    event_id: event.event_id
  };
  
  const handleAddToCalendar = async () => {
    try {
      setCalendarStatus("adding");
      
      // Check if already signed in with Google
      if (!isSignedIn()) {
        const signInResult = await signIn();
        if (!signInResult) {
          console.log("User cancelled Google sign-in");
          setCalendarStatus("cancelled");
          return false;
        }
      }

      const eventData = {
        summary: event.title,
        description: event.description,
        location: event.location || "",
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
      alert("check your Google calender now! ")
      setCalendarStatus("added");
      return true;
    } catch (error) {
      console.error("Error adding event:", error);
      setCalendarStatus("error");
      return false;
    }
  };

  const handleSignUp = async () => {
    try {
      if (isSignedUp) {
        return true;
      }

      await postAttendee(attendee);
      console.log("Signed up user:", attendee);
      
      setIsSignedUp(true);
      return true;
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
    }
  };

  const handleButtonClick = async () => {
    
    if (!user || !user.user_id) {
      alert("Please log in to sign up for the event.");
      return;
    }
    try {
      setIsSigningUp(true);
      
      // First sign up for the event
      const signUpSuccess = await handleSignUp();
      
      if (signUpSuccess) {
        // Then add to calendar if signup was successful
        await handleAddToCalendar();
      }
      
    } catch (error) {
      console.error("Error in signup process:", error);
    } finally {
      setIsSigningUp(false);
    }
  };

  // Create button text based on state
  const getButtonText = () => {
    if (isSignedUp) return "Signed Up!";
    if (isSigningUp) return "Processing...";
    if (calendarStatus === "adding") return "Adding to Calendar...";
    return "Sign up for event";
  };

  return (
    <button 
      onClick={handleButtonClick} 
      disabled={isSignedUp || isSigningUp || calendarStatus === "adding"}
      >
      {getButtonText()}
    </button>
  );
};
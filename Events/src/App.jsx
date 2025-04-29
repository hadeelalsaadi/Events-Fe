import { Navigate, Route, Routes} from 'react-router'
import '../src/App.css'
import Header from './Components/Header'
import { EventsList } from './Components/EventsList'
import {SingleEvent} from './Components/SingleEvent'
import {LoginForm} from './Components/LoginForm'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/UserContext'
import { Profile } from './Components/Profile'
import { SignUp } from './Components/SignUp'
import { PostEvent } from './Components/PostEvent'
import { initClient } from './services/googleCalender'
import { gapi } from 'gapi-script'
import { DeleteEvent } from './Components/DeleteEvent'



function App() {

  
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gapiError, setGapiError] = useState(null);
  
  useEffect(() => {
    // Function to load the gapi script
    const loadGapiAndInitialize = () => {
      // Check if script is already loaded
      if (window.gapi) {
        window.gapi.load("client:auth2", async () => {
          try {
            await initClient();
            setGapiLoaded(true);
          } catch (error) {
            console.error("Failed to initialize Google API client", error);
            setGapiError(error.message);
          }
        });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      
      script.onload = () => {
        window.gapi.load("client:auth2", async () => {
          try {
            await initClient();
            setGapiLoaded(true);
          } catch (error) {
            console.error("Failed to initialize Google API client", error);
            setGapiError(error.message);
          }
        });
      };
      script.onerror = (e) => {
        console.error("Failed to load Google API script", e);
        setGapiError("Failed to load Google API script");
      }; 
      document.body.appendChild(script);
    };
    
    loadGapiAndInitialize();
  }, []);
  
  // Show loading or error state
  if (gapiError) {
    console.log("Google API loading error:", gapiError);
  }



  const { user } = useContext(UserContext);
  return (
    <>
    
    <Header/>
    <Routes>
    <Route path="/" element={<EventsList/>}/>
      <Route path="/events" element={<EventsList/>}/>
      <Route path="/events/:event_id" element={<SingleEvent/>}/>
      <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginForm />}/>
      <Route path="/profile" element={user ? <Profile/>: <Navigate to="/login" />}/>
       <Route path ="/signup" element= {<SignUp/>}/> 
       <Route path="/events/addevent" element={<PostEvent/>}/>
       <Route path = "/events/:event_id" element ={<DeleteEvent/>}/>
    </Routes>
    
    </>
  )
}

export default App


import { Navigate, Route, Routes} from 'react-router'
import '../src/App.css'
import Header from './Components/Header'
import { EventsList } from './Components/EventsList'
import {SingleEvent} from './Components/SingleEvent'
import {LoginForm} from './Components/LoginForm'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/UserContext'
import { Profile } from './Components/Profile'
import { SignUp } from './Components/SignUp'
import { PostEvent } from './Components/PostEvent'
import { initClient } from './services/googleCalender'
import { gapi } from 'gapi-script'



function App() {

  useEffect(()=>{
    function start(){
      initClient()
    }
    gapi.load("client:auth2",start)
  },[])
  
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
    </Routes>
    
    </>
  )
}

export default App


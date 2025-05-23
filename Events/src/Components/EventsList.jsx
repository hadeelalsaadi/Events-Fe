import { useContext, useEffect, useState } from "react"
import { fetchAllEvents } from "../api"
import { EventCard } from "./EventCard"
import { PostEvent } from "./PostEvent"
import { Link, redirect } from "react-router"
import { UserContext } from "../context/UserContext"


export const EventsList = ()=>{
const {user}= useContext(UserContext)
    const [events, setEvents]= useState([])
    const [isLoading, setIsLoading]=useState(true)
    const [isError, setIsError]=useState(null)

    useEffect(()=>{
        setIsLoading(true)
        setIsError(null)
        fetchAllEvents().then((events)=>{

            setEvents(events)
            setIsLoading(false)
        }).catch((err)=>{
            setIsError(err)
        })

    },[])
    if(isError!==null){
        return <p>{isError.status} {isError.data.msg}</p>
    }
    if (isLoading) {
        return <p>Loading...</p>;
      }


      const handleButtonClick =()=>{
        if (!user) {
            alert("Please log in to continue");
            redirect("/events")
          } else if (user.user_role !== "admin") {
            alert("Only admins  users can post an event");
            redirect("/events")
          } 
      }
    return (
<>
        <section>
        {user && user.user_role === "admin" ? (
      <Link to="/events/addevent">
        <button >Add Event</button>
      </Link>
    ) : (
      
      <button onClick={handleButtonClick} disabled={!user}
      className={!user ? "disabled-button" : "button"}>Add Event</button>
    )}
          </section>
        
       <section>
   <ul>
            
            {events.map((event)=>{
                return (
                    <EventCard key={event.event_id} event={event} setEvents={setEvents} user={user}/>

                    
                )
            })}
        </ul>
       </section>
     
    </>
    )
   

}
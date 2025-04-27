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
console.log(user)
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
          } else if (user.user_role === "member") {
            alert("Only admins can post content");
            redirect("/events")
          } 
      }
    return (
<>
        <section>
        {user && user.user_role !== "member" ? (
      <Link to="/events/addevent">
        <button >Add Event</button>
      </Link>
    ) : (
      
      <button onClick={handleButtonClick}>Add Event</button>
    )}
          </section>
        
       <section>
   <ul>
            
            {events.map((event)=>{
                return (
                    <EventCard  event={event}/>
                    
                )
            })}
        </ul>
       </section>
     
    </>
    )
   

}
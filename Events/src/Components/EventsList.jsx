import { useEffect, useState } from "react"
import { fetchAllEvents } from "../api"
import { EventCard } from "./EventCard"


export const EventsList = ()=>{
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
    return (
        
       <section>
   <ul>
            
            {events.map((event)=>{
                return (
                    <EventCard  event={event}/>
                    
                )
            })}
        </ul>
       </section>
     
    
    )
   

}
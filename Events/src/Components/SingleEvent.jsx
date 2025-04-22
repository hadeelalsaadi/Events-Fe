import { useEffect, useState } from 'react'
import {useParams}from 'react-router'
import { fetchEventById } from '../api'
import { FancyBox } from './FancyBox'
export const SingleEvent = ()=>{
    const {event_id}= useParams()
    const [event, setEvent]=useState([])
    const [isLoading, setIsLoading]=useState(true)
    const [isError, setIsError]=useState(null)
    useEffect(()=>{
        setIsLoading(true)
         setIsError(null)
         fetchEventById(event_id).then((event)=>{
            setEvent(event)
            setIsLoading(false)
            setIsError(null)
         })
         .catch((err)=>{
            setIsError(err)
        })
    },[event_id])
    if(isError!==null){
        return <p>{isError.status} {isError.data.msg}  </p>
    }
    if (isLoading) {
        return <p>Loading...</p>;
      }
    return (
        <section>
            <FancyBox> <h2>{event.title}</h2>
            <h3>{event.description}</h3>
            <img src={event.url_img} alt={`image of ${event.title}`}/>
            <h3>Location : {event.location}</h3>
            <h3>Starts at : {event.start_time}</h3>
            <h3>Ends at {event.end_time}</h3>
            <h3>TimeZone: {event.timezone}</h3></FancyBox>
           
        </section>
    )
    


}
import { useContext, useEffect, useState } from 'react'
import {Link, useParams}from 'react-router'
import { fetchEventById } from '../api'
import { FancyBox } from './FancyBox'
import { UserContext } from '../context/UserContext'
import { EventSignUp } from './EventSignUp'
import { formatEventDate } from '../utils'

export const SingleEvent = ()=>{
    const {user}= useContext(UserContext)
    const {event_id}= useParams()
    const [event, setEvent]=useState([])
    const [isLoading, setIsLoading]=useState(true)
    const [isError, setIsError]=useState(null)
    useEffect(()=>{
        setIsLoading(true)
         setIsError(null)
         fetchEventById(event_id).then((event)=>{
            console.log(event);
            
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
           <FancyBox>
           <h1>{event.title}</h1>
            <h3>{event.description}</h3>
            <img src={event.url_img} alt={`image of ${event.title}`}/>
            <h3>Location : {event.location}</h3>
            <h3>Starts at : {formatEventDate(event.start_time)}</h3>
            <h3>Ends at:{formatEventDate(event.end_time)}</h3>
            <h3>TimeZone:  {event.timezone || 'Not specified'}</h3>
            <h3>Organizer id: {event.organizer_id}</h3>
            <EventSignUp event={event} user={user}/>
            
            <div className='edit'>
                <Link  to={`/events/${event_id}/edit`}>Edit</Link>
                <p>Note: Only admin users can edit the event!</p>
            </div>
            
            
            </FancyBox> 
           
        </section>
    )
    


}
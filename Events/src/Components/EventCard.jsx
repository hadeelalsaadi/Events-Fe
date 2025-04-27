
//import { Link } from "react-router"
import { FancyBox } from './FancyBox'
import { Link } from "react-router"
export const EventCard = (props)=>{
    const {event} = props
  
    return (
        <Link to={`/events/${event.event_id}`}>
       <FancyBox>
             
            <h2>{event.title}</h2>
            
            <img src={event.url_img} alt={`image of ${event.title}`}/>
            <h3>Location : {event.location}</h3>
            <h3>Starts at : {event.start_time}</h3>
            <h3>Ends at {event.end_time}</h3>
        
       </FancyBox>
       </Link>
            

            

    
        
    )
}
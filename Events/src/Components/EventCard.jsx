
//import { Link } from "react-router"
import { formatEventDate } from '../utils';
import { DeleteEvent } from './DeleteEvent';
import { FancyBox } from './FancyBox'
import { Link } from "react-router"
export const EventCard = (props)=>{
    const {event, setEvents, user} = props

     
    const handleEventDelete = (deletedEventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== deletedEventId));
      };
  
    return (
        <section>

       <FancyBox>
       <Link to={`/events/${event.event_id}`}>
            <h2>{event.title}</h2>
            <img src={event.url_img} alt={`image of ${event.title}`}/>
         </Link> 
         <h3>Location: {event.location}</h3>
         <h3>Starts at: {formatEventDate(event.start_time)}</h3>
         <h3>Ends at: {formatEventDate(event.end_time)}</h3>
         <DeleteEvent  event_id={event.event_id} onDelete={handleEventDelete} user={user}/>
        
       </FancyBox>
       
        
            
        </section>
        

            

    
        
    )
}
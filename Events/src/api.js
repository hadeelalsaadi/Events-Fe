import axios from 'axios'

const api = axios.create({
    baseURL:'https://events-be-mnrt.onrender.com/api'
})

export const deleteEvent =(event_id)=>{
    return api.delete(`/events/${event_id}`)
}




export const fetchAllEvents= ()=>{
    return api.get('/events').then(({data})=>{
        return data.events
    }).catch((err)=>{
        return Promise.reject(err.response)
    })
}

export const fetchEventById = (event_id)=>{
    return api.get(`/events/${event_id}`).then(({data})=>{
        return data.event
    }).catch((err)=>{
        return Promise.reject(err.response)
    })

}

export const getUserbyUsername= (username)=>{
    return api.get(`/users/${username}`).then((res) => {
        const user = res.data.user;
        return user;
    }).catch((err) => {
        console.error("Error fetching User", err);
        throw err;
    });
}

export const addUser=(userData)=>{
    return api.post(`/users`, userData);
}


export const addEvent =(eventDetails)=>{

    console.log("from API here..",eventDetails)
    return api.post(`/events`, eventDetails).then(({data})=> {
    }).catch((err) => {
        console.error("Error posting Item!", err);
        throw err;
    });
}

export const postAttendee=(attendee)=>{
    
    return api.post('/event_attendees',attendee).then(({data})=>data).catch((err) => {
        console.error("Error posting attendee", err);
        throw err;
    });
}
export const updateEvent = (event_id, updatedFields) => {
    // Format dates for PostgreSQL timestamps with timezone
    const formatDateForPostgres = (dateString) => {
        if (!dateString) return null;
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            
            // PostgreSQL timestamp with timezone format
            return date.toISOString();
        } catch (error) {
            console.error("Error formatting date:", error);
            return null;
        }
    };
    
    // Create a properly formatted event object for the backend
    const formattedEvent = {
        ...updatedFields,
        // Format dates for PostgreSQL
        start_time: formatDateForPostgres(updatedFields.start_time),
        end_time: formatDateForPostgres(updatedFields.end_time)
    };
    
    console.log("Sending to backend:", formattedEvent);
    
    return api.patch(`/events/${event_id}`, formattedEvent)
        .then(({ data }) => {
            console.log("Updated Event:", data.event);
            return data.event;
        })
        .catch((err) => {
            console.error("API Error:", err.response);
            return Promise.reject(err.response);
        });
};
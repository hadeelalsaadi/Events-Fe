import axios from 'axios'
const api = axios.create({
    baseURL:'https://events-be-mnrt.onrender.com/api'
})
export const fetchAllEvents= ()=>{
    return api.get('/events').then(({data})=>{
        return data.events
    }).catch((err)=>{
        console.log(err)
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

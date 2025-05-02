import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router";
import { fetchEventById, updateEvent } from "../api";
import { FancyBox } from "./FancyBox";


const categories = [
    { category_id: 1, category_name: "Music"},
    { category_id: 2, category_name:  "Technology"},
    { category_id: 3, category_name:  "Food & Drink"},
    { category_id: 4, category_name: "Art & Culture" },
    { category_id: 5, category_name: "Business" },
    { category_id: 6, category_name:"Sports & Fitness" },
    { category_id: 7, category_name: "Health & Wellness"},
    { category_id: 8, category_name: "Education" },
]

export const EditEventForm =()=>{

    const { user } = useContext(UserContext)
    const { event_id } = useParams()
    const navigate = useNavigate()
    const [event, setEvent] = useState({
        title: "",
        description: "",
        url_img: "",
        genre_id:null,
        max_attendees: 0,
        location: "",
        start_time: new Date().toISOString().slice(0, 16),
        end_time: new Date(Date.now() + 7200000).toISOString().slice(0, 16),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        organizer_id: null
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const isAdmin = user && user.user_role === "admin"

    useEffect(() => {
        setIsLoading(true)
        setIsError(null)
        
        fetchEventById(event_id)
            .then((eventData) => {
                // Formating dates for datetime-local inputs
                const formattedEvent = {
                    ...eventData,
                    start_time: eventData.start_time ? new Date(eventData.start_time).toISOString().slice(0, 16) : "",
                    end_time: eventData.end_time ? new Date(eventData.end_time).toISOString().slice(0, 16) : "",
                    timezone: eventData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                }
                setEvent(formattedEvent)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsError(err)
                setIsLoading(false)
            })
        }, [event_id])
        useEffect(() => {
            if (!isLoading && !isAdmin) {
                navigate(`/events/${event_id}`)
            }
        }, [isLoading, isAdmin, navigate, event_id])



        const handleChange = (e) => {
            const { name, value } = e.target
            setEvent(prev => ({
                ...prev,
                [name]: name === 'max_attendees' ? parseInt(value, 10) || 0 : value
            }))
        }    
        const formatDateTimeForSubmission = (dateTimeString, timezone) => {
            if (!dateTimeString) return null;
            
            // Makeing sure we have a valid date string to work with
            const date = new Date(dateTimeString);
            if (isNaN(date.getTime())) return null;
            
            // Return a properly formatted ISO string with timezone info
            return date.toISOString();
        };
const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isAdmin) {
            setIsError({ status: 403, data: { msg: "Only admins can edit events" } })
            return
        }

        try {
            setIsLoading(true)
            
            
            await updateEvent(event_id, event)
            setSuccessMessage("Event updated successfully!")
            setTimeout(() => {
                navigate(`/events/${event_id}`)
            }, 2000)
        } catch (err) {
            setIsError(err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isError !== null) {
        return <p>{isError.status} {isError.data?.msg}</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!isAdmin) {
        alert("Access denied. Only admins can edit events.")
        return null;
    }

    return (
        <section>
        <FancyBox>
            <h1>Edit Event: {event.title}</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        className="textarea"
                    />
                </div>
                
                <div>
                    <label>Image URL:</label>
                    <input
                        type="url"
                        name="url_img"
                        value={event.url_img}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                <label htmlFor="genre_id">
                    Category
                </label>
                <select
                    name="genre_id"
                    id="genre_id"
                    value={event.genre_id}
                    onChange={handleChange}
                    className="category"
                    required
                >
                    <option value="" disabled>
                        Select event category
                    </option>
                    {categories.map((category) => (
                        <option
                            key={category.category_id}
                            value={category.category_id}
                        >
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
                
                <div>
                    <label>Max Attendees:</label>
                    <input
                        type="number"
                        name="max_attendees"
                        value={event.max_attendees}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        value={event.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        value={event.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label>Timezone:</label>
                    <input
                        type="text"
                        name="timezone"
                        value={event.timezone}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                     <button type="submit">
                        {isLoading ? 'Updating...' : 'Update Event'}

                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/events/${event_id}/edit`)}
                    >
                        Cancel
                    </button>
                     {successMessage && (
                <div className="message">
                    {successMessage}
                </div>
            )}
                   
                </div>
            </form>
        </FancyBox>
    </section>
    );
}
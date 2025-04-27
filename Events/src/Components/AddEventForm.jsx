import { useEffect, useState } from "react"
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

export const AddeventForm =({ onSubmit, user })=>{
    const [eventDetails, setEventdetails]= useState({
        title: "",
        description:"",
        url_img:"",
        genre_id: "",
        max_attendees: 0,
        location: "",
        start_time: "",
        end_time:"",
        timezone:""

    })
    useEffect(() => {
        if (user?.user_id) {
            setEventdetails((prev) => ({
                ...prev,
                user_id: user.user_id,
            }));
        }
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setEventdetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(eventDetails)
        if (!user) {
            alert("You must be logged in to post an item!");
            return;
        }
        onSubmit(eventDetails)
        
    };

    return (
        <form 
            onSubmit={handleSubmit}>
            <div><h3>Please enter all event datails:</h3></div>
            <div>
                
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter event title"
                    value={eventDetails.title}
                    onChange={handleChange}

                    required
                />
            </div>

            <div>
                <textarea
                    name="description"
                    id="description"
                    value={eventDetails.description}
                    onChange={handleChange}
                    placeholder="write some words about this event"
                    className="textarea"
                    required
                />
            </div>
            <div>
                <input
                    type="url"
                    name="url_img"
                    id="url_img"
                    value={eventDetails.url_img}
                    onChange={handleChange}
                    placeholder="Enter image-URL for the event"
                    
                />
            </div>

            <div>
                <label htmlFor="genre_id">
                    Category
                </label>
                <select
                    name="genre_id"
                    id="genre_id"
                    value={eventDetails.genre_id}
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
               <label htmlFor="max_attendees">Maximum attendees</label>
                <input
                    type="number"
                    name="max_attendees"
                    id="max_attendees"
                    value={eventDetails.max_attendees}
                    onChange={handleChange}
                   
                />
            </div>

            <div>
                <input
                    type="text"
                    name="location"
                    value={eventDetails.location}
                    onChange={handleChange}
                    placeholder="Enter the exact place with postcode please"
                />
            </div>
            <div>
            <input
                    type="datetime-local"
                    name="start_time"
                    value={eventDetails.start_time}
                    onChange={handleChange}
                    placeholder="When event starts?"
                   
                />
            </div>
            <div>
            <input
                    type="datetime-local"
                    name="end_time"
                    value={eventDetails.end_time}
                    onChange={handleChange}
                    placeholder="When event ends?"
                   
                />
            </div>
            <div>
            <input
                    type="text"
                    name="timezone"
                    value={eventDetails.timezone}
                    onChange={handleChange}
                    placeholder="TimeZone if you know!"
                   
                />
            </div>

            <button
                type="submit"
                className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}
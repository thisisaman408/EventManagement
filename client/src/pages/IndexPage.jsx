/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiComment, BiLike } from "react-icons/bi";
  export default function IndexPage() {
    const [events, setEvents] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
      // Fetch events from the server
      axios
        .get("/createEvent")
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }, []);

    const handleLike = (eventId) => {
      axios
        .post(`/event/${eventId}`)
        .then((response) => {
            setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === eventId
                ? { ...event, likes: event.likes + 1 }
                : event
            )
          );
        })
        .catch((error) => {
          console.error("Error liking the event:", error);
        });
    };
  

    return (
      <>
      <div className="mt-1 flex flex-col">
        <div className="hidden sm:block" >
          <div href="#" className="flex item-center inset-0">
            <img src="../src/assets/hero.jpg" alt="" className='w-full'/> 
          </div>
        </div>

        <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5 ">
        
        {events.length > 0 && events.map((event) => (
            <div className="bg-white rounded-xl relative">
              <div >
                {event.image &&(
                  <img src={event.image} alt="" />
                )}
              </div>

                <div className="absolute flex gap-4 bottom-[215px] right-6 md:bottom-[215px] md:right-3 sm:bottom-[215px] sm:right-3">
                <button onClick={() => handleLike(event._id)}>
                  <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                </button>
              
                </div>

              <img src="../src/assets/paduru.png" alt="" className='rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9'/> 
              {/* FIXME: This is a demo image after completing the create event function delete this */}

              <div className="m-2 grid gap-2">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                  <div className="flex gap-2 items-center mr-2 text-red-600"> <BiLike /> {event.likes}</div>
                </div>
                

                <div className="flex text-xs flex-nowrap justify-between text-primarydark text-md font-bold mr-4">
                  <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                  <div>{event.ticketPrice === 0? 'Free' : 'Rs.'+ event.ticketPrice}</div>
                </div>

                <div className="text-xs flex flex-col flex-wrap truncate-text">{event.description}</div>
                <div className="text-sm text-primarydark font-bold my-2 ">Organized By: {event.organizedBy}</div>
                
                <Link to={'/event/'+event._id} className="flex justify-center">
                  <button className="primary flex items-center gap-2">Book Ticket< BsArrowRightShort className="w-6 h-6" /></button>
                </Link>
                
              </div>

            </div> 
          ))}
        </div>

      </div>
      </>
        
      )
  }
  
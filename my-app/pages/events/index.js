import {getEvents} from "@/lib/evnet/getEvents";
import { useEffect,useState } from "react";
import EventNavbar from "@/components/eventNavBar";
import styles from "@/styles/Question.module.css";
import { Container } from "react-bootstrap";
import DisplayEvent from "@/components/EventDisplay";

function BasicExample() {
  const [events,setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents(true);
      setEvents(data);
    };
    fetchData();
  }, []);
  const reloadEvents= async (newest=true,category="") => {
    const data = await getEvents(newest,category);
    setEvents(data);
  };
  return (
    <>
    <EventNavbar  reload={reloadEvents}/>
    <Container className={styles.scrollable}>
      {events.length === 0 ? (
        <h3 className="m-3">No events found</h3>
      ) : (<>
        {events.map((event) => (
          <DisplayEvent key={event._id} event={event} />
        ))}
      </>)}
      
    </Container>
    </>

  );
}

export default BasicExample;

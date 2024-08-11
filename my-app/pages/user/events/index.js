import {getEventByUser} from "@/lib/evnet/getEventyByUser";
import { useEffect, useState } from "react";
import styles from "@/styles/QuesetionDisplay.module.css";
import { Container } from "react-bootstrap";
import DisplayEvent from "@/components/EventDisplay";
import Link from "next/link";
import Image from "next/image";

function BasicExample() {
  const [events, setEvents] = useState([]);
  const reloadEvents = async () => {
    const data = await getEventByUser();
    setEvents(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventByUser();
      setEvents(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Container className={styles.scrollable}>
        <Link href="/events">
          <Image
            src="/backArrowQuestions.png"
            width={50}
            height={50}
            alt="back arrow image"
          ></Image>
        </Link>
        {events.length === 0 ? (
          <h3 className="m-3">No events found</h3>
        ) : (
          <>
            {events.map((event) => (
              <DisplayEvent key={event._id} event={event} ssf={true} reload={reloadEvents} />
            ))}
          </>
        )}
      </Container>
    </>
  );
}

export default BasicExample;

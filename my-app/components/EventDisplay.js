import Button from "react-bootstrap/Button";
import Router from "next/router";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import {deleteEvent} from "@/lib/evnet/deleteEvent";
import { formatDate } from "@/lib/DateFromat/askDateFormat";
export default function DisplayEvent({ event,ssf=false,reload}) {
  const router = Router;
  let pathname = `/events/${event._id}`;
  if(ssf){
    pathname = `/user/events/${event._id}`;
  }
  const handleEdit=()=>{
    console.log("Edit event");
   router.push({
     pathname:"/user/events/edit",
     query: { event: JSON.stringify(event) },
   });
  
  }

  const handleDelte = async () => {
    const data = await deleteEvent(event._id);
    if(data){
      reload();
    }
  }
  return (
    <>
      <Row className="border my-3 rounded  bg-white">
        <Col className="m-2" md={12}>
          {event.title.substr(0, 100)}
        </Col>
        <Col className="m-2" md={12}>
          {event.description.substr(0, 250)}
        </Col>
        <Col className="m-2" md={12}>
          {"Created on " + formatDate(event.created_at)}
        </Col>

        <Col className="m-2 " md={12}>
          <Button
            variant="danger"
            className="me-2"
            onClick={(e) => {
              e.preventDefault();
              router.push({
                pathname: pathname,
                query: { event: JSON.stringify(event) },
              });
            }}
          >
            View Event
          </Button>
          {ssf && (
            <Button className="my-2  me-2" variant="danger" onClick={handleEdit}>
              Edit Event
            </Button>
          )}
          {ssf && (
            <Button className="my-2" variant="danger" onClick={handleDelte}>
              Delete Event
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

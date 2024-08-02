import {getUserTickets }from '@/lib/ticket/getUserTickets';
import { useEffect, useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import {getActiveTickets} from '@/lib/ticket/getActiveTickets';
import TicketNavBar from '@/components/ticketNavBar';
import Image from 'next/image';
import Link from 'next/link';
import TicketDisplay from '@/components/ticketDisplay';
import styles from "@/styles/QuesetionDisplay.module.css";
import { gettingUser } from '@/lib/gettingUser';
import {getAllTickets} from "@/lib/ticket/getAllTickets"


export default function Page() {
  const role=gettingUser.role;
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if(role=='student'){
      const data = await getUserTickets();
      setTickets(data);
      }
      else{
        const data=await getAllTickets();
        setTickets(data);
      }
    };
    fetchData();
  }, []);
  async function reloadTickets (active) {
    const data = await getActiveTickets(active);
    setTickets(data);
  };
  return (
    <>
      <Container className={styles.scrollable}>
       {role=="student" && (<TicketNavBar reload={reloadTickets} />)}
        <Row className="my-3">
          <Col>
            <Link href="/ask">
              <Image
                src="/backArrowQuestions.png"
                width={50}
                height={50}
                alt="back arrow image "
              ></Image>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Your tickets</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {tickets.length === 0 ? (
              <h3>No tickets found</h3>
            ) : (
              <>
                {tickets.map((ticket) => (
                  <TicketDisplay key={ticket._id} ticket={ticket} />
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
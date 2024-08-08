import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import styles from '@/styles/Activities.module.css';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImage = 'https://images.adsttc.com/media/images/6196/b960/9a95/7a76/4f1e/5b68/large_jpg/newnham-campus-food-hall-taylor-smyth-architects-20.jpg?1637267827';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', `${process.env.NEXT_PUBLIC_BACKENDURL}/activities`);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities`);
        console.log('Fetched activities:', res.data);
        setActivities(res.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className={styles.container}>
      <header className={styles.header}>
        <h1>Activities</h1>
        <Button as={Link} href="/activities/create" className={`mb-4 ${styles.createActivityButton}`}>Create New Activity</Button>
      </header>
      <div className={styles.scrollableContainer}>
        <Row className={styles.row}>
          {activities.map(activity => (
            <Col key={activity._id} xs={12} sm={4} className={styles.col}>
              <Card as={Link} href={`/activities/${activity._id}`} className={styles.card}>
                <Card.Img variant="top" src={activity.image ? activity.image : defaultImage} onError={handleImageError} />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>{activity.title}</Card.Title>
                  <Card.Text className={styles.cardText}>
                    {new Date(activity.date).toLocaleDateString()}<br />
                    Location: {activity.location}<br />
                    Host: {activity.user.first_name} {activity.user.last_name}<br />
                    {activity.joined} people joined
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ActivityList;

import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '@/styles/ActivityDetail.module.css';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
        setActivity(res.data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleJoinActivity = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/join`, { activityId: id });
      alert('Joined activity successfully!');
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!activity) return <div>Activity not found</div>;

  return (
    <Container className={styles.container}>
      <Card>
        <Card.Img variant="top" src={activity.image || '/default-image.jpg'} />
        <Card.Body>
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>
            Date: {new Date(activity.date).toLocaleDateString()}<br />
            Location: {activity.location}<br />
            <a href={activity.link} target="_blank" rel="noopener noreferrer">More Info</a><br />
            {activity.participants.length} people joined
          </Card.Text>
          <Button onClick={handleJoinActivity}>Join Activity</Button>
          {activity.isCreator && (
            <Button variant="secondary" onClick={() => navigate(`/activities/edit/${activity._id}`)} className="ml-2">Edit Activity</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivityDetail;

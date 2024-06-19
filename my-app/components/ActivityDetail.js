import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Link from 'next/link';
import styles from '@/styles/ActivityDetail.module.css';

const ActivityDetail = ({ id }) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter for navigation

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

    if (id) {
      fetchActivity();
    }
  }, [id]);

  const handleJoinActivity = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/join`, { activityId: id });
      alert('Joined activity successfully!');
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

  const handleDeleteActivity = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
      alert('Activity deleted successfully!');
      // Redirect to activities list or another appropriate page after deletion
      router.push('/activities');
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!activity) return <div>Activity not found</div>;

  const participantsCount = activity.participants ? activity.participants.length : 0;

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
            {participantsCount} people joined
          </Card.Text>
          <Button onClick={handleJoinActivity}>Join Activity</Button>
          {activity.isCreator && (
            <>
              <Link href={`/activities/edit/${activity._id}`}>
                <Button variant="secondary" className="ml-2">Edit Activity</Button>
              </Link>
              <Button variant="danger" className="ml-2" onClick={handleDeleteActivity}>Delete Activity</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivityDetail;

import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/ActivityDetail.module.css';
import GroupChatModal from './GroupChat';

const ActivityDetail = () => {
  const [activityData, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Get the activity id from the URL
  const defaultImage = 'https://images.adsttc.com/media/images/6196/b960/9a95/7a76/4f1e/5b68/large_jpg/newnham-campus-food-hall-taylor-smyth-architects-20.jpg?1637267827';
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      setCurrentUserId(userId);
    }
  }, []);
  
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
        setActivity(res.data);
        console.log('Fetched activity:', res.data);

        if (res.data.activity.participants.includes(currentUserId)) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
        }

      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id, currentUserId]);

  const handleJoinActivity = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/join`, { activityId: id, userId: userId });
      if (res.data.error) {
        console.log(res.data.error);
        alert(res.data.error);
      } else {
        alert('Joined activity successfully!');
        setIsJoined(true);
        setActivity((prevData) => ({
          ...prevData,
          activity: {
            ...prevData.activity,
            joined: prevData.activity.joined + 1,
          },
        }));
      }
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

  const handleDeleteActivity = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/activities/${id}`);
      alert('Activity deleted successfully!');
      router.push('/activities');
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  if (loading) return <div>Loading...</div>;
  if (!activityData) return <div>Activity not found</div>;

  const { activity } = activityData;
  const participantsCount = activity.joined ? activity.joined : 0;

  return (
    <Container className={styles.container}>
      <Card>
        <Card.Img variant="top" src={`${process.env.NEXT_PUBLIC_BACKENDURL}/uploads/${activity.image || ''}`} 
                onError={handleImageError} />
        <Card.Body>
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>
            Date: {new Date(activity.date).toLocaleDateString()}<br />
            Location: {activity.location}<br />
            Host: {activity.user.first_name} {activity.user.last_name}<br />
            <a href={activity.link} target="_blank" rel="noopener noreferrer">More Info</a><br />
            {participantsCount} people joined
          </Card.Text>
          {isJoined ? (
            <Button onClick={() => setShowGroupChatModal(true)}>Group Chat</Button>
          ) : (
            <Button onClick={handleJoinActivity}>Join Activity</Button>
          )}
          {currentUserId === activity.user._id && (
            <>
            <Link href={`/activities/edit/${id}`}>
                <Button variant="secondary" className="ml-2">Edit Activity</Button>
              </Link>
              <Button variant="danger" className="ml-2" onClick={handleDeleteActivity}>Delete Activity</Button>
            </>
          )}
        </Card.Body>
      </Card>

      <GroupChatModal
        show={showGroupChatModal}
        onHide={() => setShowGroupChatModal(false)}
        activityId={id} 
      />
    </Container>
  );
};

export default ActivityDetail;

import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import styles from '@/styles/Notification.module.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/notifications`);
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.notificationContainer}>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <Card key={notification._id} className="mb-3">
            <Card.Body>
              <Card.Title>{notification.title}</Card.Title>
              <Card.Text>
                {notification.message}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Notification;

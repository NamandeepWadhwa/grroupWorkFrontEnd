import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import styles from '@/styles/Notification.module.css';
import { gettingUser } from '../lib/gettingUser';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/notifications`, {
          headers: {
            Authorization:`JWT ${gettingUser().token}`,
          },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/notifications/${id}`, {
          headers: {
            Authorization:`JWT ${gettingUser().token}`,
          },
        });
        setNotifications(notifications.filter((notification) => notification._id !== id));
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

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
              <Button variant="danger" onClick={() => handleDeleteNotification(notification._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Notification;

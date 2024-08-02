import { Modal, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styles from '@/styles/Home.module.css';

const Post = ({ _id, title, image, createdAt, user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  console.log('User data:', user);

  return (
    <div className={styles.post}>
      <div className="d-flex post">
        <div className={styles.postImageCard}>
          <Link href={`/freeboard/${_id}`}>
            <img src={`${process.env.NEXT_PUBLIC_BACKENDURL}/${image}`} alt="Post Image" />
          </Link>
        </div>
        <div>
          <Link href={`/freeboard/${_id}`} className={styles.texts}>
            <h3>{title}</h3>
          </Link>
          <p className="info">
            <time>{format(new Date(createdAt), 'yyyy-MM-dd')}</time>
            {' | '}
            {user && <span onClick={handleShowModal} style={{ cursor: 'pointer', color: '#007bff' }}>{`${user.first_name} ${user.last_name}`}</span>}
          </p>
        </div>
      </div>

      {/* User Info Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className={styles.profileCard}>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <div className={styles.profilePicture}>
                <img src={user.profile_picture} alt="User Icon" />
              </div>
              <Card.Text>
                <strong>Name:</strong> {user.first_name} {user.last_name}<br />
                <strong>Bio:</strong> {user.bio}<br />
                <strong>Year of Entrance:</strong> {user.entrance_year}<br />
                <strong>Program:</strong> {user.program}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Post;


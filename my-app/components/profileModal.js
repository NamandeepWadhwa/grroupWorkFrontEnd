import { Modal, Card } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';

const ProfileModal = ({ show, onHide, user, currentUser }) => {
  const isCurrentUser = currentUser && currentUser._id === user._id;
  const privateFields = user.private_fields || {};

  return (
    <Modal show={show} onHide={onHide}>
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
              {!privateFields.bio || isCurrentUser ? (
                <>
                  <strong>Bio:</strong> {user.bio}<br />
                </>
              ) : null}
              {!privateFields.yearOfEntrance || isCurrentUser ? (
                <>
                  <strong>Year of Entrance:</strong> {user.entrance_year}<br />
                </>
              ) : null}
              {!privateFields.program || isCurrentUser ? (
                <>
                  <strong>Program:</strong> {user.program}<br />
                </>
              ) : null}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;

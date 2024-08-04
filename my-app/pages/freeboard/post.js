import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styles from '@/styles/Home.module.css';
import ProfileModal from '@/components/profileModal';

const Post = ({ _id, title, image, createdAt, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      setCurrentUserId(userId);
    }
  }, []);

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

      <ProfileModal
        show={showModal}
        onHide={handleCloseModal}
        user={user}
        currentUser={currentUserId}
      />
    </div>
  );
};

export default Post;

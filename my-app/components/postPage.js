import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '@/styles/Home.module.css';
import styles1 from '@/styles/CreateActivity.module.css';
import Comments from '@/components/comments';

const PostPage = ({ postInfo }) => {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      setCurrentUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (!postInfo) return;
  }, [postInfo]);

  if (!postInfo) return null; 

  const handleEditClick = () => {
    router.push(`/freeboard/edit/${postInfo._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/${postInfo._id}`);
        router.push(`/freeboard`);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center">
          <div className="w-75 justify-content-start">
            <Link href="/freeboard" passHref={true} legacyBehavior={true}>
              <a className={styles1.backLink}>
                <FaArrowLeft className={styles1.arrowIcon} />
              </a>
            </Link>
          </div>
          {currentUserId === postInfo.user._id && (
            <>
            <Button onClick={handleEditClick} className={styles.eBtn}>
              Edit post
            </Button>
            <Button onClick={handleDelete} className={styles.dBtn}>
              Delete post
            </Button>
            </>
          )}
        </div>
        <div className={styles.freeboardContainer}>
          <div className={styles.freeboard}>
            <div className="d-flex">
              <div className={styles.postHeader}>
                <h1>{postInfo.title}</h1>
                <time>{format(new Date(postInfo.createdAt), 'yyyy-MM-dd')}</time>
                {' | '}
                {postInfo.user && `${postInfo.user.first_name} ${postInfo.user.last_name}`}
              </div>
            </div>
            <div className={styles.image}>
              <img src={postInfo.image} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>
          <div className={styles.commentsSection}>
            <Comments postId={postInfo._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

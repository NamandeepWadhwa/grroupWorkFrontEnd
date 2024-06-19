import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import { formatISO9075 } from 'date-fns';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '@/styles/Home.module.css';
import styles1 from '@/styles/CreateActivity.module.css';

const PostPage = ({ postInfo }) => {
  const router = useRouter();
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
        console.error('Error deleting post :', error);
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
        <Button onClick={handleEditClick} className={styles.postBtn}>
          Edit post
        </Button>
        <Button onClick={handleDelete} className={styles.postBtn}>
          Delete post
        </Button>
      </div>
      <div className={styles.freeboardContainer}>
        <div className={styles.freeboard}>
          <div className="d-flex">
            <div className={styles.postHeader}>
              <h1>{postInfo.title}</h1>
              <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            </div>
          </div>
          <div className={styles.image}>
            <img src={`${process.env.NEXT_PUBLIC_BACKENDURL}/${postInfo.image}`} alt=""/>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      </div>
    </div>
    </>
  );
};

export default PostPage;

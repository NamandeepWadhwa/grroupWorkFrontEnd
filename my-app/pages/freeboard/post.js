import { formatISO9075 } from 'date-fns';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Post = ({ _id, title, image, createdAt }) => {
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
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Post;

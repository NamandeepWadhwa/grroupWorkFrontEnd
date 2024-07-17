import { format } from 'date-fns';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

const Post = ({ _id, title, image, createdAt, user }) => {
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
            {user && `${user.first_name} ${user.last_name}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;

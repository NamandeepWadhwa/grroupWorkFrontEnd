import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/Home.module.css';
import PostPage from '@/components/postPage';

const PostPageDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/${id}`);
        if (res.status === 200) {
          const data = await res.data;
          setPostInfo(data);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchPostInfo();
    }
  }, [id]);

  if (!postInfo) {
    return <p>Loading...</p>;
  }

  return <PostPage postInfo={postInfo} />;
};

export default PostPageDetail;

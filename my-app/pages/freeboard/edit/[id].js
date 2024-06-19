import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditPost from '@/components/editPost';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard/${id}`);
        if (res.status === 200) {
          setPostInfo(res.data);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!postInfo) {
    return <p>Loading...</p>;
  }

  return <EditPost postInfo={postInfo} />;
};

export default EditPostPage;

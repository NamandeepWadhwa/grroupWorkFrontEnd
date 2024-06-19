import Post from './freeboard/post';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/freeboard`)
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post._id} {...post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

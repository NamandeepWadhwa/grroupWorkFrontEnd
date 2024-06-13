import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from "@/styles/Home.module.css";
import ReactQuill from 'react-quill';

export default function Editor({ value, onChange }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="content">
      <ReactQuill
        className={styles.postContent}
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}

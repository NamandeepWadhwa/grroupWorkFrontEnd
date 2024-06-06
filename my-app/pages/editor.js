import ReactQuill from "react-quill";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from "@/styles/Home.module.css";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({value,onChange}) {
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
  return (
    <div className="content">
    <ReactQuill className={styles.postContent}
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
  );
}

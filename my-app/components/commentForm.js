import { useState } from "react";
import styles from "@/styles/Comment.module.css";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        placeholder="Write comment"
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.writeBtn}>
      <button className={styles.editBtn} disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      </div>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;

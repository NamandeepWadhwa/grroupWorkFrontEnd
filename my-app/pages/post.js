import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";
import styles from "@/styles/Home.module.css";

export default function Post({_id,title,content,image,createdAt}) {

  return (
    <div className={styles.post}>
        <div className="d-flex post">
        <div className={styles.postImageCard}>
            <Link to={`/post/${_id}`}>
                <img src={'http://localhost:8080/'+image} alt=""/>
            </Link>
        </div>
        <div>
            <Link className={styles.texts} to={`/post/${_id}`}>
            <h3>{title}</h3>
            </Link>
            <p className="info">
            <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
        </div>
        </div>
    </div>
  );
}

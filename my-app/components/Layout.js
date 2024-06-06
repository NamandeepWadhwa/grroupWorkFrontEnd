import Header from './header';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

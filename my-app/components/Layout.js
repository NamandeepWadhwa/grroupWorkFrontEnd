import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { removingUser } from '@/lib/removingUser';
import styles from '@/styles/Layout.module.css';

const Layout = ({ children }) => {
  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      removingUser();
      window.location.href = '/user/login';
    }
  };

  return (
    <>
      <Head>
        <title>SenecaSocial</title>
        <meta name="description" content="Welcome to our SenecaSocial website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image
                src="/SS_Logo_hd.png"
                alt="SNS Logo"
                className={styles.logo}
                width={100}
                height={100}
              />
            </Link>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/activities">Activities</Link></li>
              <li><Link href="/freeboard">Freeboard</Link></li>
              <li><Link href="/ask">Ask</Link></li>
            </ul>
          </nav>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </header>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;

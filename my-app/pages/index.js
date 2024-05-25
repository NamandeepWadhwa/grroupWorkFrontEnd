import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { removingUser } from "@/lib/removingUser";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
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
                width={500}
                height={500}
              />
            </Link>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/activities">Activities</a></li>
              <li><a href="/freeboard">Freeboard</a></li>
              <li><a href="/ask">Ask</a></li>
            </ul>
          </nav>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </header>
        <main className={styles.main}>
          <section className={styles.cardsSection}>
            <div className={styles.card}>
              <h2>Upcoming Events</h2>
              <p>Discover upcoming events and join us!</p>
            </div>
            <div className={styles.card}>
              <h2>Trending Activities</h2>
              <p>Find and participate in trending activities.</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

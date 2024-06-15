import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Head>
        <title>SenecaSocial</title>
        <meta name="description" content="Welcome to our SenecaSocial website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
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

import React from 'react';
import styles from "@/styles/Home.module.css";

const HomeContent = () => {
    return (
        <main>
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
    );
};

export default HomeContent;

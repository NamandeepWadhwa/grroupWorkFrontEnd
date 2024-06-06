import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const router = useRouter();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      import("@/lib/removingUser").then(({ removingUser }) => removingUser());
      router.push("/user/login");
    }
  };

  return (
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
  );
}

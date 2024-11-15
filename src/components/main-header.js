import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/main-header.module.css";

import logoImg from "@/public/images/logo.png";

export default function MainHeader() {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} href="/">
                <Image src={logoImg} alt={"A plate with food on it"} priority />{" "}
                {/* In Next.js we have to use src instead of just logoImg */}
                Next Level Food
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/meals">Browse Meals</Link>
                    </li>
                    <li>
                        <Link href="/community">Foodies Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

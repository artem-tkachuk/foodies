import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "@/components/main-header/main-header-background";
import NavLink from "./nav-link";

import logoImg from "@/public/images/logo.png";

import styles from "@/styles/main-header.module.css";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>
                <Link className={styles.logo} href="/">
                    <Image
                        src={logoImg}
                        alt={"A plate with food on it"}
                        priority
                    />{" "}
                    {/* In Next.js we have to use src instead of just logoImg */}
                    Next Level Food
                </Link>

                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

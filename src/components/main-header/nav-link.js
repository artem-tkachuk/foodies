"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/main-header/nav-link.module.css";

export default function NavLink({ href, children }) {
    const pathname = usePathname(); // This is a hook that returns the currently active pathname

    return (
        <Link
            href={href}
            className={` ${styles.link} ${pathname.startsWith(href) && styles.active}`}
        >
            {children}
        </Link>
    );
}

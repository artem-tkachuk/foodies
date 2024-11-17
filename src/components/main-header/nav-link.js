"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/nav-link.module.css";

export default function NavLink({ href, children }) {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={` ${styles.link} ${pathname.startsWith(href) ? styles.active : ""} `}
        >
            {children}
        </Link>
    );
}

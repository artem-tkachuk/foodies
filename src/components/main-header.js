import Link from "next/link";

import logoImg from "@/public/images/logo.png";

export default function MainHeader() {
    return (
        <header>
            <Link href="/">
                <img src={logoImg.src} alt={"A plate with food on it"} /> {/* In Next.js we have to use src instead of just logoImg */}
                Next Level Food
            </Link>
            
            <nav>
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

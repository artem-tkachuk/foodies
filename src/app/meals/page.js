import Link from "next/link";
import { Suspense } from "react";

import MealsGrid from "@/components/meals/meals-grid";

import { getMeals } from "@/lib/meals";

import styles from "@/styles/meals/meals.module.css";

export const metadata = {
    title: "All meals",
    description: "Browse the delicious meals shared by our vibrant community!",
};

async function Meals() {
    // [FIXED] This is not logged anymore in PROD build on every run of this component because these pages are pregenerated and cached (by default)
    console.log("Fetching meals..."); 

    const meals = await getMeals();

    return <MealsGrid meals={meals} />;
}

// we can use async keyword here because it's a server component
export default function MealsPage() {
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious meals, created{" "}
                    <span className={styles.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself! It is easy
                    and fun!
                </p>
                <p className={styles.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={styles.main}>
                {/* Show loading fallback just for this part of JSX code instead of the entire page like loading.js does */}
                <Suspense
                    fallback={
                        <p className={styles.loading}>Fetching meals...</p>
                    }
                >
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}

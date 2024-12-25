import Link from "next/link";
import Image from "next/image";

import { getMeal } from "@/lib/meals";

import styles from "@/styles/meals/meal-details.module.css";
import { notFound } from "next/navigation";

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.IdMeal);

    if (!meal) {
        // Calling this function will stop this component from rendering and will show the closest not found or error page
        // Whichever is closer.
        notFound();
    }

    // replace new lines with <br /> tags
    meal.instructions = meal.instructions.replace(/\n/g, "<br />");

    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={styles.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={styles.creator}>
                        by{" "}
                        <a href={`mailto:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={styles.summary}>{meal.summary}</p>
                </div>
            </header>

            <main className={styles.main}>
                <p
                    className={styles.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
                {/* <Link href="/meals">Go back to meals</Link> */}
            </main>
        </>
    );
}

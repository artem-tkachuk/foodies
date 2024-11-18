import Link from "next/link";

export default function MealDetailsPage({ params }) {
    return (
        <main>
            <h1>Meal page for {params.IdMeal}</h1>
            <p>
                <Link href="/meals">Go back to meals</Link>
            </p>
        </main>
    );
}

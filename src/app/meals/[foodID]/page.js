import Link from "next/link";

export default function MealPage({ params }) {
    return (
        <main>
            <h1>Meal page for {params.foodID}</h1>
            <p>
                <Link href="/meals">Go back to meals</Link>
            </p>
        </main>
    );
}

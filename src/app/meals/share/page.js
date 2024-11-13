import Link from "next/link";

export default function ShareMealPage() {
    return (
        <main>
            <h1>Share Meals on this page!!!</h1>
            <p>
                <Link href="/meals">Go back to meals</Link>
            </p>
        </main>
    );
}

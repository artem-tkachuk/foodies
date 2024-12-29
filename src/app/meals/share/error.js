"use client";

// in Error({error}), the exact error message will be hidden to avoid leaking sensitive information to users
export default function MealsShareErrorPage({ error }) {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Failed to publish a meal! Please try again!</p>
            <p>{error.message}</p>
        </main>
    );
}

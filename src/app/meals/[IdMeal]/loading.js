import styles from "@/styles/meals/meal-details.module.css";

export default function LoadingMealDetails() {
    return (
        <>
            <header className={styles.header}>
                <div className={`${styles.image} loading`}></div>
                <div className={styles.headerText}>
                    <h1 className="loading">Loading meal details...</h1>
                    <p className={`${styles.creator} loading`}>
                        Loading creator...
                    </p>
                    <p className={`${styles.summary} loading`}>
                        Loading summary...
                    </p>
                </div>
            </header>
            <main className={styles.main}>
                <p className={`${styles.instructions} loading`}>
                    Loading instructions...
                </p>
            </main>
        </>
    );
}

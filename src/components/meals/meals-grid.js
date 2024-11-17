import MealItem from "@/components/meals/meal-item";

import styles from "@/styles/meals-grid.module.css";

export default function MealsGrid({ meals }) {
    return (
        <>
            <ul className={styles.meals}>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        <MealItem {...meal} />
                    </li>
                ))}
            </ul>
        </>
    );
}

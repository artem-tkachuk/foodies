import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
    // Simulate a delay
    // await new Promise((resolve) => setTimeout(resolve, 2000)); 

    // throw new Error("Loading meals failed... oh no!!!!"); // To trigger an example of how to handle an error
    // .run() is used when changing data, but .all() is used when fetching data and we want to get back all rows. .get() is used for a single row
    return db.prepare("SELECT * FROM meals").all(); 
}

// export async function getMeal(idMeal) {
export function getMeal(idMeal) {
    // Simulate a delay
    // await new Promise((resolve) => setTimeout(resolve, 10000)); 

    // not using ? opens us up to SQL injection attacks
    // sqlite3 will protect us from this
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(idMeal); // slug is the column name in the meals table
}

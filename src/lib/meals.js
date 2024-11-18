import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate a delay

    // throw new Error("Loading meals failed... oh no!!!!"); // To trigger an example of how to handle an errors
    return db.prepare("SELECT * FROM meals").all();
}

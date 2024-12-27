import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
    // Simulate a delay
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error("Loading meals failed... oh no!!!!"); // To trigger an example of how to handle an error
    // .run() is used when changing data, but .all() is used when fetching data and we want to get back all rows. .get() is used for a single row
    return db.prepare("SELECT * FROM meals").all();
}

// export async function getMeal(idMeal) {
export async function getMeal(idMeal) {
    // Simulate a delay to test loading states
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // not using ? opens us up to SQL injection attacks
    // sqlite3 will protect us from this
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(idMeal); // slug is the column name in the meals table
}

export async function saveMeal(meal) {
    // We need to create a slug for the meal
    meal.slug = slugify(meal.title, { lower: true }); // all characters are lowercase

    // We need to sanitize the meal instructions to prevent XSS attacks
    meal.instructions = xss(meal.instructions);

    // Storing file in the database is a bad idea! We should store the file in the file system and store the path in the database
    // It's bad for performance because databases aren't built for that

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}-${Date.now()}.${extension}`;
    
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Saving image failed");
            // TODO: handle this in the UI
        }
    });

    // We don't want to store the image file itself in the database
    // The content of the public/ folder will be server as if it was root of our server, so we should exclude that from the path
    // When requests are made to the server, the public/ folder will be excluded from the path
    meal.image = `/images/${fileName}`; 

    // We need to insert the meal into the database
    db.prepare(`
        INSERT INTO meals (
            title, 
            summary, 
            instructions, 
            creator, 
            creator_email, 
            image, 
            slug
        ) 
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}

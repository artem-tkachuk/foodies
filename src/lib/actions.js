// When adding this directive, all functions in this file are treated as server actions
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals";

const requiredProperties = ["title", "summary", "instructions", "image", "creator", "creator_email"];

function isInvalidMeal(meal) {
    // Check for unexpected properties
    if (Object.keys(meal).length !== requiredProperties.length) {
        return true; // Return false if there are unexpected properties
    }
    
    for (const prop of requiredProperties) {
        if (!meal[prop] || (prop != "image" && meal[prop].trim() === "")) {
            return true;
        }
    }

    if (!meal.creator_email.includes("@")) {
        return true;
    }

    if (meal.image.size === 0) {
        return true;
    }

    return false; // Return false if all properties are valid
}

// async is another necessary keyword to make it a server action
// formData is the object that contains input keys and values from the for
// It uses FormData class available in JavaScript to create an object that contains the form data

// WARN: adding server actions like this will only work if such server action is part of the server component
// i.e. we're not allowed to have server actions in client components
export async function shareMeal(prevState, formData) {
    // LEGACY COMMENTS:
    // This directive creates a Server Action – a function that is guaranteed to run on the server and only there
    // Components by default are server components => only execute on the server
    // This function is now only executed on the server with this directive
    // In case of functions, we have to explicitly state that the function belongs to the server by adding the directive inside of them
    // "use server";

    console.log("user submitted the form");

    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("mealImage"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    if (isInvalidMeal(meal)) {
        // throw new Error("Invalid input");

        // we don't have to either redirect or throw an error, we can just return a response object
        // it should be a serializable object –> it shouldn't include any methods
        return {
            message: "Invalid input",
        };
    }

    //// DEBUG
    // console.log(meal);

    // TODO: handle exceptions
    await saveMeal(meal);
    
    // we know that in this server action we're updating the meals page
    // and the this page's data depends on the new meal we just submitted
    // so we need to revalidate the meals page
    // NOTE: by default only the specified path is revalidated, not the nested pages
    // specifying "layout" will revalidate all the nested pages
    // revalidating means Next.js will throw away the old pages from the cache and re-generate the pages and cache them again (if they're cached)
    // [mealId] page is dynamically generated, so it's not cached
    // can revalidate the entire app with revalidatePath("/", "layout");
    // here we don't care about the nested pages, so we can use "page"
    revalidatePath("/meals", "page"); // default is "page"

    redirect("/meals");
}

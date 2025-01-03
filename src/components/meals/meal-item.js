import Link from "next/link";
import Image from "next/image";

import classes from "@/styles/meals/meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    {/* fill is an alternative to width and height when we don't know the size of the image in advance, e.g. when fetching from an API */}
                    {/* If you know the size of the image in advance, you should use width and height */}
                    <Image src={image} alt={title} fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}

// We now can make this a client component because we're moved server actions to the lib/actions.js file
// We couldn't do this before because we were defining server and client code in the same file
// Next.js's build process is not able to separate server and client code in the same file in the clean way
// Server code could end up on the client side, which could pose security risks
// So we're moving server actions to a separate file
"use client";

import { useFormState } from "react-dom";

import MealsFormSubmit from "@/components/meals/meals-form-submit";
import ImagePicker from "@/components/meals/image-picker";

import { shareMeal } from "@/lib/actions";

import styles from "@/styles/share/share.module.css";

export default function ShareMealPage() {
    // First argument is the server action that should be triggered when the form is submitted
    // Second argument is the initial state
    // state holds the latest response returned by the server action
    // this is man in the middle pattern – resembling middleware in Node.js
    const [state, formAction] = useFormState(shareMeal, { message: null });
    
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Share your{" "}
                    <span className={styles.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>

            <main className={styles.main}>
                {/* 
                    Action prop is usually set to some path like action="/some-url" to which the request/form data is sent
                    if we're relying on the browser built-in form submission.
                    But here we don't need to send it to a specific path, we just want to execute the function
                    So we set it to the function name itself
                */}
                <form className={styles.form} action={formAction}>
                    <div className={styles.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                            />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input
                            type="text"
                            id="summary"
                            name="summary"
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Your meal image" name="mealImage" />
                    {state.message && <p className={styles.error}>{state.message}</p>}
                    <p className={styles.actions}>
                        <MealsFormSubmit />
                    </p>
                </form>
            </main>
        </>
    );
}

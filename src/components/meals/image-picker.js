"use client";

import { useState, useRef } from "react";

import styles from "@/styles/meals/image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(null);

    const imageInputRef = useRef();

    function handlePickerClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        setPickedImage(file);

        // Convert to Data URL – a value that can be used as an image source (input for an img tag)
        const fileReader = new FileReader();
        // When the file is read, the onload function is called
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <>
            <div className={styles.picker}>
                <label htmlFor={name}>{label}</label>
                <div className={styles.controls}>
                    <div className={styles.preview}>
                        {!pickedImage ? (
                            <p>No image picked yet</p>
                        ) : (
                            <Image
                                src={pickedImage}
                                alt="Image selected by the user for their meal"
                                fill
                            />
                        )}
                    </div>
                    {/* 
                        Because of the "display: none" in the stylesheet, the input is hidden.
                        But it's still part of the DOM!
                    */}
                    <input
                        className={styles.input}
                        type="file"
                        id={name}
                        name={name}
                        accept="image/png, image/jpeg"
                        ref={imageInputRef}
                        // multiple={true} { /* If we want to allow the user to pick multiple images, but we don't need that here */ }
                        onChange={handleImageChange}
                        required
                    />
                    {/* 
                        If we don't set the button type to "button", it will default to "submit" 
                        Which means that clicking this button will submit the form!
                    */}
                    <button
                        className={styles.button}
                        type="button"
                        onClick={handlePickerClick}
                    >
                        Pick an image!
                    </button>
                </div>
            </div>
        </>
    );
}

"use client";

import { useRef } from "react";

import styles from "@/styles/meals/image-picker.module.css";


export default function ImagePicker({ label, name }) {
    const imageInputRef = useRef();
    
    function handlePickerClick() {
        imageInputRef.current.click();
    }


    return (
        <>
            <div className={styles.picker}>
                <label htmlFor={name}>{label}</label>
                <div className={styles.controls}>
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

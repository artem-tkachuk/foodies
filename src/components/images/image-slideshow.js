import { useEffect, useState } from "react";

import Image from "next/image";

import styles from "@/styles/image-slideshow.module.css";

import burgerImg from '@/assets/burger.jpg'

const images = [
    { image: burgerImg, alt: "A delicious, juicy burger" },
]

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0 // TODO use % to loop back to 0 instead of going out of bounds
            );
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.slideshow}>
            {images.map((imageObj, index) => (
                <Image
                    key={index}
                    src={imageObj.image}
                    alt={imageObj.alt}
                    className={index === currentImageIndex ? styles.active : ""}
                />
            ))}
        </div>
    )
}

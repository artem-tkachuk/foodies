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
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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

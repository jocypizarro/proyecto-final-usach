"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./herocss.module.css";

interface Slide {
    image: string;
    title: string;
    subtitle: string;
    }

    const slides: Slide[] = [
    {
        image: "/assets/1.jpg",
        title: "Creamos experiencias",
        subtitle: "Diseño contemporáneo para marcas creativas.",
    },
    {
        image: "/assets/2.jpg",
        title: "Diseño con propósito",
        subtitle: "Cada detalle cuenta una historia.",
    },
    {
        image: "/assets/3.jpg",
        title: "Objetos únicos",
        subtitle: "Colecciones inspiradas en el arte.",
    },
    {
        image: "/assets/4.jpg",
        title: "Hecho para destacar",
        subtitle: "Diseño, calidad y personalidad.",
    },
    ];

    export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        nextSlide();
        }, 6000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <section className={styles.hero}>
        <div
            className={styles.slider}
            style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
            }}
        >
            {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
                <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className={styles.image}
                />

                <div className={styles.overlay} />

                <div className={styles.content}>
                <h1>{slide.title}</h1>

                <p>{slide.subtitle}</p>

                <Link href="/tienda" className={styles.button}>
                    Ver más
                </Link>
                </div>
            </div>
            ))}
        </div>

        <button
            onClick={prevSlide}
            className={`${styles.arrow} ${styles.left}`}
        >
            ❮
        </button>

        <button
            onClick={nextSlide}
            className={`${styles.arrow} ${styles.right}`}
        >
            ❯
        </button>
        </section>
    );
}
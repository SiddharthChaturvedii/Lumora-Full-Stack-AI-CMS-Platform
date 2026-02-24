"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Bebas_Neue, Bodoni_Moda } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "900"], style: ["italic"] });

export default function HeroSection() {
    // Default to desktop initially to prevent hydration mismatch flashes if possible
    const isMobile = useMediaQuery("(max-width: 767px)");
    const isDesktop = !isMobile;

    // Desktop has 74 frames, Mobile has 80 frames
    const frameCount = isMobile ? 80 : 74;
    const mediaFolder = isMobile ? "mobile" : "desktop";

    const containerRef = useRef(null);

    // Track scroll exactly over this massive container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);
    const [currentFrame, setCurrentFrame] = useState(1);

    // Opacity mapping: Keep text hidden until the very end of the scroll (e.g. at 95% scroll)
    const textOpacity = useTransform(scrollYProgress, [0, 0.95, 0.96, 1], [0, 0, 1, 1]);

    // Create a canvas ref for drawing the frames
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);

    // Preload images into memory so there's no flickering
    useEffect(() => {
        let isCancelled = false;

        const loadImages = async () => {
            const loadedImages = [];
            for (let i = 1; i <= frameCount; i++) {
                if (isCancelled) break;
                const img = new Image();
                // Number padding: 001 to 080
                const paddedIndex = i.toString().padStart(3, "0");
                img.src = `/frames/${mediaFolder}/ezgif-frame-${paddedIndex}.jpg`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => resolve(); // continue even if one fails
                });
            }
            if (!isCancelled) {
                imagesRef.current = loadedImages;
                // Draw first frame right away
                if (canvasRef.current && loadedImages[1]) {
                    drawFrame(1);
                }
            }
        };

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, [frameCount, mediaFolder]);

    // When scroll changes, update the canvas
    useEffect(() => {
        return frameIndex.on("change", (latest) => {
            const frame = Math.floor(latest);
            if (frame > 0 && frame <= frameCount && frame !== currentFrame) {
                setCurrentFrame(frame);
                drawFrame(frame);
            }
        });
    }, [frameIndex, currentFrame, frameCount]);

    const drawFrame = (frame) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const img = imagesRef.current[frame];

        if (img && ctx) {
            // Ensure canvas resolves to screen size dynamically
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Logic to "cover" the canvas image like object-fit: cover
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    };

    return (
        // The massive scroll area (e.g. 400vh gives enough scroll time to see frames smoothly)
        <section
            ref={containerRef}
            className="relative w-full h-[400vh] bg-black"
        >
            {/* Sticky container stays on screen while we scroll the parent */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">

                {/* TEXT LAYER (Behind the Canvas via mix-blend) */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute inset-0 z-0 flex md:flex-col md:items-center md:justify-center leading-[0.8] mix-blend-screen text-center pointer-events-none"
                >
                    {/* Vampire Brutalism Layout */}
                    <div className={`
                        text-[4rem] sm:text-[5rem] md:text-[15rem] uppercase text-white ${bebas.className}
                        max-md:absolute max-md:top-[14%] max-md:w-full max-md:text-center
                    `}>
                        CREATE
                    </div>

                    <div
                        className={`
                            text-[4rem] sm:text-[5rem] md:text-[15rem] uppercase text-white ${bebas.className}
                            max-md:absolute max-md:top-[26%] max-md:w-full max-md:text-center
                        `}
                    >
                        GROW
                    </div>

                    <div
                        className={`
                            text-[3.5rem] sm:text-[4.2rem] md:text-[11rem] lowercase text-[#e60000] ml-0 md:ml-40 ${bodoni.className}
                            max-md:hidden
                        `}
                        style={{ textShadow: "0 0 40px rgba(255,0,0,0.5)" }}
                    >
                        publish.
                    </div>
                </motion.div>

                {/* MEDIA LAYER */}
                {/* Canvas uses mix-blend-lighten so its black background disappears! */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                    style={{ mixBlendMode: 'lighten' }}
                />

                {/* Ambient Overlay Layer (Vampire Brutalism subtle glow) */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            </div>
        </section>
    );
}

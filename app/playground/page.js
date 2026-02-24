"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Bebas_Neue,
    Bodoni_Moda,
    Bungee,
    Rajdhani,
    JetBrains_Mono
} from "next/font/google";

// --- Font Configurations ---
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "900"], style: ["italic"] });
const bungee = Bungee({ subsets: ["latin"], weight: ["400"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

// --- Helper Component: Blood Drip & Glitch Text ---
const GlitchRedText = ({ text }) => {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#ff0000] to-[#800000]">
                {text}
            </span>
            <span className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-[#ff0000] opacity-0 group-hover:opacity-60 transition-opacity duration-100 mix-blend-screen mix-blend-add">
                {text}
            </span>
            <span className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-[#ffffff] opacity-0 group-hover:opacity-40 transition-opacity duration-100 mix-blend-screen mix-blend-add">
                {text}
            </span>
        </div>
    );
};

export default function PlaygroundPage() {
    const [activeHover, setActiveHover] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#000000] text-white selection:bg-[#ff0000]/40 selection:text-white">

            {/* 🩸 DEMO 4: VAMPIRE BRUTALISM (Pure Black & Hyper Red) */}
            <section className="relative h-screen w-full bg-[#020202] border-b border-[#330000] flex flex-col justify-center px-6 md:px-24 overflow-hidden">
                {/* Subtle red spotlight tracking mouse */}
                <div
                    className="absolute w-[600px] h-[600px] bg-[#ff0000] rounded-full blur-[150px] opacity-[0.05] pointer-events-none transition-transform duration-1000 ease-out"
                    style={{ transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)` }}
                />

                <div className="z-10 flex flex-col items-start leading-[0.8] tracking-tight">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        className={`text-[8rem] md:text-[15rem] uppercase text-white ${bebas.className}`}
                    >
                        CREATE
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className={`text-[6rem] md:text-[11rem] pl-10 md:pl-40 lowercase text-[#ff0000] ${bodoni.className}`}
                        style={{ textShadow: "0 0 40px rgba(255,0,0,0.5)" }}
                    >
                        publish.
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
                        className={`text-[8rem] md:text-[15rem] uppercase text-transparent stroke-text hover:text-[#ff0000] transition-colors duration-500 cursor-pointer ${bebas.className}`}
                        style={{ WebkitTextStroke: "2px #333333" }}
                    >
                        GROW
                    </motion.div>
                </div>

                <div className="absolute top-4 left-4 text-xs font-mono text-[#ff0000] uppercase tracking-widest z-20">
                    Demo 4 // VAMPIRE BRUTALISM // Bebas Neue + Bodoni
                </div>
            </section>


            {/* 🔴 DEMO 5: THE SITH HOLOCRON (Charcoal, Menacing Tech & Hover Expand) */}
            <section className="relative h-screen w-full bg-[#0a0a0a] border-b border-[#330000] flex flex-col items-center justify-center overflow-hidden">

                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#ff0000] opacity-20 blur-[100px]"></div>

                <div className="z-10 text-center flex flex-col items-center gap-6">
                    <motion.h1
                        initial={{ letterSpacing: "10px", opacity: 0 }}
                        whileInView={{ letterSpacing: "2px", opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={`text-6xl md:text-[8rem] uppercase text-[#e5e5e5] ${rajdhani.className}`}
                    >
                        Create.
                    </motion.h1>

                    <motion.div
                        whileHover={{ scale: 1.1, letterSpacing: "15px" }}
                        className={`text-5xl md:text-[7rem] uppercase font-bold text-[#ff0000] cursor-crosshair transition-all duration-300 ${rajdhani.className}`}
                        style={{ textShadow: "0px 0px 20px rgba(255,0,0,0.8)" }}
                    >
                        <GlitchRedText text="PUBLISH." />
                    </motion.div>

                    <motion.h1
                        initial={{ letterSpacing: "10px", opacity: 0 }}
                        whileInView={{ letterSpacing: "2px", opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                        className={`text-6xl md:text-[8rem] uppercase text-[#e5e5e5] ${rajdhani.className}`}
                    >
                        Grow.
                    </motion.h1>
                </div>

                <div className="absolute top-4 left-4 text-xs font-mono text-[#ff0000] uppercase tracking-widest bg-black px-2 py-1">
                    Demo 5 // SITH HOLOCRON // Rajdhani Tech Brutalism
                </div>
            </section>


            {/* 🩸 DEMO 6: MASSIVE IMPACT (Extremely Heavy Blocks, Interaction Reveal) */}
            <section className="relative h-screen w-full bg-[#050505] flex overflow-hidden">

                {/* Left Side: Intense Blocks */}
                <div className="w-full md:w-3/5 h-full flex flex-col justify-center px-4 md:px-16 z-20">
                    {[
                        { word: "CREATE", font: bungee.className },
                        { word: "PUBLISH", font: bungee.className, isRed: true },
                        { word: "GROW", font: bungee.className }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0, rotateX: 90 }}
                            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.5 }}
                            onMouseEnter={() => setActiveHover(index)}
                            onMouseLeave={() => setActiveHover(null)}
                            className="cursor-pointer overflow-hidden leading-[0.85] py-2 w-fit transform origin-bottom"
                        >
                            <div
                                className={`text-[5rem] md:text-[10rem] transition-all duration-300 
                  ${item.isRed ? "text-[#ff0000] drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" : "text-[#555555] hover:text-white"} 
                  ${item.font}`}
                            >
                                {item.word}.
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Side: Red Abstract Images */}
                <div className="hidden md:block absolute right-0 top-0 w-2/5 h-full bg-[#111111] border-l border-[#ff0000]/20 z-10 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {activeHover !== null && (
                            <motion.div
                                key={activeHover}
                                initial={{ opacity: 0, x: 200, scale: 1.2 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -200, scale: 0.8 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="w-full h-full relative"
                            >
                                {/* Red Color Burn Overlay */}
                                <div className="absolute inset-0 bg-[#ff0000] mix-blend-color-burn opacity-60 z-10" />
                                <img
                                    src={[
                                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000", // Abstract liquid
                                        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000", // Tech geometry
                                        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1000"  // Abstract glass
                                    ][activeHover]}
                                    className="w-full h-full object-cover grayscale"
                                    alt="Abstract"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {activeHover === null && (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#ff0000]/50 space-y-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="w-32 h-32 border-dashed border-2 border-[#ff0000]/30 rounded-full flex items-center justify-center"
                            >
                                <span className={`${jetbrains.className} text-xs tracking-widest`}>AWAIT</span>
                            </motion.div>
                        </div>
                    )}
                </div>

                <div className="absolute top-4 left-4 text-xs font-mono text-[#ff0000] uppercase tracking-widest z-30">
                    Demo 6 // MASSIVE IMPACT // Bungee & Image Overlays
                </div>
            </section>

            {/* 🐆 DEMO 7: MOBILE PANTHER SCROLL (Scroll reveal overlay) */}
            <MobileScrollPanther />

        </div>
    );
}

// --- Helper Component: Mobile Scroll Panther ---
function MobileScrollPanther() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animate "CREATE" (top)
    const createY = useTransform(scrollYProgress, [0, 0.4], [-100, 50]);
    const createOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    // Animate "GROW" (bottom)
    const growY = useTransform(scrollYProgress, [0.6, 1], [100, -50]);
    const growOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#050505] border-y border-[#330000] h-[300vh]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Simulated Leopard Video / Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for the panther video */}
                    <div className="w-[300px] h-[500px] bg-[#111] border border-[#330000] rounded-xl flex items-center justify-center relative shadow-[0_0_50px_rgba(255,0,0,0.1)] overflow-hidden">
                        <span className={`text-[#ff0000] text-6xl italic ${bodoni.className}`} style={{ textShadow: "0 0 30px rgba(255,0,0,0.8)", zIndex: 10 }}>publish.</span>
                        {/* Fake Panther */}
                        <div className="absolute opacity-20 text-[100px] mt-20 grayscale filter blur-[2px]">🐆</div>
                        {/* Red vignette gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0"></div>
                    </div>
                </div>

                {/* Animated Texts Overlay */}
                <motion.div 
                    style={{ y: createY, opacity: createOpacity }}
                    className={`absolute top-0 text-[6rem] md:text-[8rem] text-white uppercase ${bebas.className} tracking-widest z-20`}
                >
                    CREATE
                </motion.div>

                <motion.div 
                    style={{ WebkitTextStroke: "2px #ff0000", y: growY, opacity: growOpacity }}
                    className={`absolute bottom-0 md:bottom-10 text-[6rem] md:text-[8rem] text-transparent uppercase ${bebas.className} tracking-widest z-20`}
                >
                    GROW
                </motion.div>

                {/* Info Text */}
                <div className="absolute top-4 left-4 text-xs font-mono text-[#ff0000] uppercase tracking-widest z-30">
                    Demo 7 // MOBILE SCROLL // Z-Index Sticky
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-4 right-4 text-xs font-mono text-[#ff0000] animate-pulse z-30">
                    ↓ Scroll Down
                </div>
            </div>
        </section>
    );
}

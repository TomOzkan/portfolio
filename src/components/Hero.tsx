"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";

export default function Hero() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Fade out entire hero on scroll
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

    return (
        <motion.section
            ref={ref}
            id="hero"
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-noise"
        >
            {/* Dramatic Morphing Blob */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
                    <div
                        className="w-full h-full bg-gradient-to-br from-primary/50 via-accent/40 to-purple-500/45 blur-[70px]"
                        style={{
                            animation: "morph 10s ease-in-out infinite",
                            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes morph {
                    0% {
                        border-radius: 73% 27% 40% 60% / 62% 48% 52% 38%;
                        transform: rotate(0deg) scale(1) translate(0, 0);
                    }
                    14% {
                        border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
                        transform: rotate(51deg) scale(1.2) translate(-5%, 5%);
                    }
                    28% {
                        border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
                        transform: rotate(102deg) scale(0.85) translate(5%, -5%);
                    }
                    42% {
                        border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
                        transform: rotate(153deg) scale(1.15) translate(-3%, 3%);
                    }
                    57% {
                        border-radius: 38% 62% 63% 37% / 70% 50% 50% 30%;
                        transform: rotate(204deg) scale(0.9) translate(4%, -4%);
                    }
                    71% {
                        border-radius: 55% 45% 45% 55% / 45% 60% 40% 55%;
                        transform: rotate(255deg) scale(1.1) translate(-4%, 2%);
                    }
                    85% {
                        border-radius: 47% 53% 58% 42% / 55% 48% 52% 45%;
                        transform: rotate(306deg) scale(0.95) translate(3%, -3%);
                    }
                    100% {
                        border-radius: 73% 27% 40% 60% / 62% 48% 52% 38%;
                        transform: rotate(360deg) scale(1) translate(0, 0);
                    }
                }
            `}</style>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary mb-6">
                                {t.hero.status}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6"
                        >
                            Tom <span className="text-gradient">Ozkan</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-10"
                        >
                            {t.hero.role}
                            <br />
                            {t.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                        >
                            <a
                                href="#contact"
                                className="group px-8 py-3 rounded-full bg-white text-background font-semibold hover:bg-white/90 transition-all flex items-center gap-2"
                            >
                                {t.hero.contactBtn}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={t.hero.downloadBtn === "Télécharger CV" ? "/cv-fr.pdf" : "/cv-en.pdf"}
                                className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                {t.hero.downloadBtn}
                                <Download size={18} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] mx-auto">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-3xl opacity-30 animate-pulse" />

                            {/* Glass card */}
                            <div className="relative w-full h-full rounded-full border border-white/20 overflow-hidden bg-white/5 backdrop-blur-md p-2">
                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                    <Image
                                        src="/images/profile-dark.png"
                                        alt="Tom Ozkan"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

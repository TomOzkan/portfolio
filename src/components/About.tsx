"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Layout, Code2, Terminal, Cpu, Globe, ArrowUpRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function About() {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                        {t.about.competenceTitle} <br />
                        <span className="text-gradient">{t.about.competenceSubtitle}</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
                >
                    {/* 1. Profile / Bio - Large Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Terminal size={120} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t.about.profileTitle}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                            {t.about.profileDesc1}
                        </p>
                        <div className="mt-6 flex gap-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">Problem Solver</span>
                            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">Tech Enthusiast</span>
                        </div>
                    </motion.div>

                    {/* 2. Current Status - Small Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />

                        {/* Background Kanzoto Logo */}
                        <div className="absolute -bottom-6 -right-6 opacity-10 transform rotate-0 pointer-events-none">
                            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                                <path d="M6 3v18M6 12l11-9M6 12l11 9" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-green-400">{t.bento.current.title}</span>
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-1">{t.bento.current.project}</h4>
                            <p className="text-muted-foreground text-sm">{t.bento.current.subtitle} - {t.bento.current.role}</p>
                        </div>
                    </motion.div>

                    {/* 3. Project Management - Medium Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group"
                    >
                        <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit text-primary group-hover:scale-110 transition-transform">
                            <Layout size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{t.about.managementTitle}</h3>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            {t.about.managementList.map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 4. Full Stack - Medium Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors group"
                    >
                        <div className="mb-4 p-3 rounded-xl bg-accent/10 w-fit text-accent group-hover:scale-110 transition-transform">
                            <Code2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{t.about.techTitle}</h3>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                            {t.about.techList.map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 5. Tech Stack - Small Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors flex flex-col justify-center items-center text-center"
                    >
                        <h3 className="text-lg font-bold mb-6 text-muted-foreground">Tech Stack</h3>
                        <div className="flex flex-wrap justify-center gap-4 text-foreground/80">
                            <Cpu size={28} className="hover:text-primary transition-colors" />
                            <Globe size={28} className="hover:text-primary transition-colors" />
                            <Terminal size={28} className="hover:text-primary transition-colors" />
                            <Code2 size={28} className="hover:text-primary transition-colors" />
                        </div>
                    </motion.div>

                    {/* 6. Latest Project - Wide Card */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-3 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-1/4 -translate-y-1/4">
                            <div className="w-64 h-64 rounded-full bg-primary blur-3xl" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 rounded text-xs font-bold bg-primary text-white">{t.bento.latest.badge}</span>
                                    <span className="text-sm text-muted-foreground">2025</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t.bento.latest.title}</h3>
                                <p className="text-muted-foreground mb-6 max-w-lg">
                                    {t.bento.latest.description}
                                </p>
                                <div className="flex gap-2 mb-6">
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">Symfony</span>
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">PHP</span>
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-muted-foreground border border-white/10">SQL</span>
                                </div>
                            </div>

                            {/* Logo Visual Representation */}
                            <div className="w-full md:w-1/3 h-48 rounded-2xl bg-white/5 border border-white/5 overflow-hidden relative group-hover:border-white/10 transition-colors flex items-center justify-center p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/teliae-logo.png"
                                        alt="Teliae Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

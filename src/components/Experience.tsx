"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";

export default function Experience() {
    const { t } = useLanguage();
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={ref} id="experience" className="py-20 relative bg-noise">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.experience.title}</h2>
                    <p className="text-muted-foreground">{t.experience.subtitle}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-12">
                        {t.experience.jobs.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 mt-1.5"
                                />

                                <div className="md:w-1/2 pl-8 md:pl-0">
                                    <motion.div
                                        whileHover={{ scale: 1.02, borderColor: "rgb(88 166 255 / 0.5)" }}
                                        transition={{ duration: 0.2 }}
                                        className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 text-primary mb-2">
                                            <Briefcase size={16} />
                                            <span className="text-sm font-medium">{exp.company}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                            <Calendar size={14} />
                                            <span>{exp.period}</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                </div>
                                <div className="md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
    const { t } = useLanguage();

    return (
        <section id="skills" className="py-20 bg-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.skills.title}</h2>
                    <p className="text-muted-foreground">{t.skills.subtitle}</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.skills.categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-background border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-6 text-gradient">{category.title}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

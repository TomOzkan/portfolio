"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.contact.title}</h2>
                    <p className="text-muted-foreground">{t.contact.subtitle}</p>
                </motion.div>

                <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <a
                            href="mailto:tomozkan0@icloud.com"
                            className="flex flex-col items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">{t.contact.email}</h3>
                                <p className="text-sm text-muted-foreground">tomozkan0@icloud.com</p>
                            </div>
                        </a>

                        <a
                            href="tel:+33652305300"
                            className="flex flex-col items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
                                <p className="text-sm text-muted-foreground">+33 6 52 30 53 00</p>
                            </div>
                        </a>

                        <div className="flex flex-col items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">{t.contact.location}</h3>
                                <p className="text-sm text-muted-foreground">{t.contact.locationValue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="mailto:tomozkan0@icloud.com"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            {t.contact.submitBtn}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

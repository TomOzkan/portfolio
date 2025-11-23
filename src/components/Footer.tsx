"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="py-8 border-t border-white/10 bg-background">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Tom Ozkan. {t.footer.rights}
                </div>
                <div className="flex items-center gap-6">
                    <a href="https://www.linkedin.com/in/tom-ozkan-133693210/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-white transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://github.com/TomOzkan" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-white transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}

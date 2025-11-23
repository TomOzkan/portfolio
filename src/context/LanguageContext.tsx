"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

type Translations = {
    nav: {
        home: string;
        about: string;
        experience: string;
        skills: string;
        contact: string;
    };
    hero: {
        status: string;
        role: string;
        description: string;
        contactBtn: string;
        downloadBtn: string;
    };
    about: {
        title: string;
        profileTitle: string;
        profileDesc1: string;
        profileDesc2: string;
        competenceTitle: string;
        competenceSubtitle: string;
        competenceDesc: string;
        managementTitle: string;
        techTitle: string;
        managementList: string[];
        techList: string[];
    };
    experience: {
        title: string;
        subtitle: string;
        jobs: {
            title: string;
            company: string;
            period: string;
            description: string;
        }[];
    };
    education: {
        title: string;
        subtitle: string;
        schools: {
            degree: string;
            school: string;
            period: string;
            description: string;
        }[];
    };
    bento: {
        current: {
            title: string;
            subtitle: string;
            project: string;
            role: string;
        };
        latest: {
            badge: string;
            title: string;
            description: string;
            link: string;
        };
    };
    skills: {
        title: string;
        subtitle: string;
        categories: {
            title: string;
            items: string[];
        }[];
    };
    contact: {
        title: string;
        subtitle: string;
        email: string;
        phone: string;
        location: string;
        locationValue: string;
        submitBtn: string;
    };
    footer: {
        rights: string;
    };
};

const translations: Record<Language, Translations> = {
    fr: {
        nav: {
            home: "Accueil",
            about: "À propos",
            experience: "Parcours",
            skills: "Compétences",
            contact: "Contact",
        },
        hero: {
            status: "Disponible pour de nouvelles opportunités",
            role: "Chef de Projet SI & Développeur Full-Stack",
            description: "Je transforme les besoins métiers en solutions techniques performantes. Une double compétence pour une gestion de projet efficace et un développement de qualité.",
            contactBtn: "Me contacter",
            downloadBtn: "Télécharger CV",
        },
        about: {
            title: "À propos",
            profileTitle: "Profil",
            profileDesc1: "Passionné par les technologies de l’information, diplômé d’une formation Bac+5 en gestion de projet SI, je suis actuellement à la recherche d’une première opportunité professionnelle.",
            profileDesc2: "Spécialisé en développement et en coordination de projets en environnement Agile, je souhaite mettre ma double compétence technique et managériale au service d’équipes projets.",
            competenceTitle: "La double compétence",
            competenceSubtitle: "Technique & Managériale",
            competenceDesc: "Mon parcours hybride me permet de comprendre les enjeux techniques tout en gardant une vision stratégique du projet.",
            managementTitle: "Gestion de Projet",
            techTitle: "Développement",
            managementList: ["Pilotage d'équipe", "Méthode Agile / Scrum", "Relation Client"],
            techList: ["Architecture Web", "Développement Full-Stack", "API & Base de données"],
        },
        experience: {
            title: "Expérience Professionnelle",
            subtitle: "Mon parcours en gestion de projet et développement.",
            jobs: []
        },
        education: {
            title: "Parcours Académique",
            subtitle: "Ma formation en gestion de projet et développement.",
            schools: [
                {
                    degree: "Chef de projet Système d'information",
                    school: "Institut G4",
                    period: "2022 – 2025",
                    description: "Titre RNCP Niveau 7 (Bac+5). Pilotage de projets numériques, coordination des parties prenantes, gestion des risques et alignement stratégique SI.",
                },
                {
                    degree: "BTS SNIR (Systèmes Numériques Informatique et Réseaux)",
                    school: "Lycée Edouard Branly",
                    period: "2020 – 2022",
                    description: "Apprentissage du développement bas niveau, réseaux et systèmes embarqués.",
                }
            ],
        },
        bento: {
            current: {
                title: "Actuellement",
                subtitle: "Fondateur & Lead",
                project: "Kanzoto",
                role: "Agence Web",
            },
            latest: {
                badge: "DERNIER PROJET",
                title: "Teliae",
                description: "Développement Back-end (PHP/Symfony) pour un TMS (Transport Management System). Optimisation de modules et conception de fonctionnalités métier.",
                link: "Voir le projet",
            }
        },
        skills: {
            title: "Compétences Techniques",
            subtitle: "Un arsenal complet pour le développement et la gestion.",
            categories: [
                {
                    title: "Langages & Frameworks",
                    items: ["PHP", "TypeScript", "React", "Next.js", "Symfony", "Laravel", "Tailwind CSS", "SQL"],
                },
                {
                    title: "Outils & DevOps",
                    items: ["Git", "Docker", "Linux", "Jira", "Trello", "Confluence", "Notion"],
                },
                {
                    title: "Gestion de Projet",
                    items: ["Agile", "Scrum", "Kanban", "Cycle en V", "Planification", "Coordination"],
                },
            ],
        },
        contact: {
            title: "Me Contacter",
            subtitle: "Prêt à collaborer sur votre prochain projet ?",
            email: "Email",
            phone: "Téléphone",
            location: "Localisation",
            locationValue: "International / France",
            submitBtn: "Envoyer un message",
        },
        footer: {
            rights: "Tous droits réservés.",
        },
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            experience: "Education",
            skills: "Skills",
            contact: "Contact",
        },
        hero: {
            status: "Available for new opportunities",
            role: "IT Project Manager & Full-Stack Developer",
            description: "I transform business needs into high-performance technical solutions. A dual competence for effective project management and quality development.",
            contactBtn: "Contact Me",
            downloadBtn: "Download CV",
        },
        about: {
            title: "About",
            profileTitle: "Profile",
            profileDesc1: "Passionate about information technologies, holding a Master's degree in IT Project Management, I am currently looking for my first professional opportunity.",
            profileDesc2: "Specialized in development and project coordination in Agile environments, I wish to put my dual technical and managerial competence at the service of project teams.",
            competenceTitle: "The Dual Competence",
            competenceSubtitle: "Technical & Managerial",
            competenceDesc: "My hybrid background allows me to understand technical challenges while keeping a strategic vision of the project.",
            managementTitle: "Project Management",
            techTitle: "Development",
            managementList: ["Team Leadership", "Agile / Scrum Method", "Client Relations"],
            techList: ["Web Architecture", "Full-Stack Development", "API & Database"],
        },
        experience: {
            title: "Professional Experience",
            subtitle: "My background in project management and development.",
            jobs: []
        },
        education: {
            title: "Academic Background",
            subtitle: "My education in project management and development.",
            schools: [
                {
                    degree: "Information Systems Project Manager",
                    school: "Institut G4",
                    period: "2022 – 2025",
                    description: "RNCP Level 7 Title (Master's Degree). Management of digital projects, stakeholder coordination, risk management, and IT strategic alignment.",
                },
                {
                    degree: "BTS SNIR (Digital Systems, IT and Networks)",
                    school: "Lycée Edouard Branly",
                    period: "2020 – 2022",
                    description: "Learning low-level development, networks, and embedded systems.",
                }
            ],
        },
        bento: {
            current: {
                title: "Currently",
                subtitle: "Founder & Lead",
                project: "Kanzoto",
                role: "Web Agency",
            },
            latest: {
                badge: "LATEST PROJECT",
                title: "Teliae",
                description: "Back-end Development (PHP/Symfony) for a TMS (Transport Management System). Module optimization and business feature design.",
                link: "View Project",
            }
        },
        skills: {
            title: "Technical Skills",
            subtitle: "A complete arsenal for development and management.",
            categories: [
                {
                    title: "Languages & Frameworks",
                    items: ["PHP", "TypeScript", "React", "Next.js", "Symfony", "Laravel", "Tailwind CSS", "SQL"],
                },
                {
                    title: "Tools & DevOps",
                    items: ["Git", "Docker", "Linux", "Jira", "Trello", "Confluence", "Notion"],
                },
                {
                    title: "Project Management",
                    items: ["Agile", "Scrum", "Kanban", "V-Model", "Planning", "Coordination"],
                },
            ],
        },
        contact: {
            title: "Contact Me",
            subtitle: "Ready to collaborate on your next project?",
            email: "Email",
            phone: "Phone",
            location: "Location",
            locationValue: "International / France",
            submitBtn: "Send a message",
        },
        footer: {
            rights: "All rights reserved.",
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("fr");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

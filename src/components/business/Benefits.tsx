"use client";

import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { FileText, Cloud, Globe, Gauge } from "lucide-react";
import { splitTextInTwoLines } from "@/utils/utils";
import React from "react";

type Benefit = {
    id: number;
    title: string;
    icon: string; // "File" | "Cloud" | "Globe" | "Meter"
};

type BenefitsProps = {
    className?: string;
    id?: string;
};

const ICONS: Record<string, React.ElementType> = {
    File: FileText,
    Cloud: Cloud,
    Globe: Globe,
    Meter: Gauge,
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const Benefits: React.FC<BenefitsProps> = ({ className, id = "benefits" }) => {
    const { text } = useSiteMode();

    const benefits = (text?.packages?.benefits ?? []) as Benefit[];
    if (!benefits.length) return null;

    return (
        <section id={id} className={clsx("w-full pb-20 md:pb-32", className)}>
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 fluid-gap sm:grid-cols-4"
                >
                    {benefits.map((b) => {
                        const Icon = ICONS[b.icon] ?? FileText;
                        const [t1, t2] = splitTextInTwoLines(b.title);

                        return (
                            <motion.div
                                key={b.id}
                                variants={itemVariants}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                                    <Icon className="text-primary" size={40} />
                                </div>
                                <p className="mt-4 text-h6 font-normal text-gray-900/80 px-[1rem] uppercase line-clamp-2">
                                    {t1}<br />{t2}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

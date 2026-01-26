"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { TransformCard } from "@/components/business/TransformCard";

import { motion, Variants } from "framer-motion";

type TransformIdea = {
    id: number;
    title: string;
    subtitle: string;
};

type TransformData = {
    title: string;
    img: string;
    ideas: TransformIdea[];
};

type TransformSectionProps = {
    className?: string;
    id?: string;
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

export const TransformSection: React.FC<TransformSectionProps> = ({
    className,
    id = "transform",
}) => {
    const { text } = useSiteMode();
    const transform = text?.transform as TransformData;

    if (!transform) return null;

    return (
        <section id={id} className={clsx("w-full pb-20", className)}>
            <div className="">
                <div className="relative">
                    {/* background image */}
                    <div className="absolute inset-0">
                        <Image
                            src={transform.img}
                            alt={transform.title}
                            fill
                            priority={false}
                            className="object-cover object-center"
                            sizes="100vw"
                        />

                        {/* overlays */}
                        <div className="absolute inset-0 bg-black/35" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/70" />
                    </div>

                    {/* content */}
                    <div className="container relative z-10 ">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center capitalize pt-48"
                        >
                            {transform.title}
                        </motion.h2>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="mt-7 sm:mt-9 pb-28 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {(transform.ideas ?? []).map((idea) => (
                                <motion.div key={idea.id} variants={itemVariants}>
                                    <TransformCard idea={idea} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

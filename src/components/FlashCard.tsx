"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type FlashCardProps = {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonRoute: string;

    /** e.g. ["#4F46E5", "#3B82F6"] */
    gradientColors: [string, string];

    /** Optional image (if provided => split layout like FastInternetFamily) */
    img?: string;
    imgAlt?: string;

    className?: string;

    /** Optional fine-tuning */
    roundedClassName?: string;
    minHeightClassName?: string;
    buttonVariant?: "light" | "outline";
};

import { motion } from "framer-motion";

export const FlashCard: React.FC<FlashCardProps> = ({
    title,
    subtitle,
    buttonText,
    buttonRoute,
    gradientColors,
    img,
    imgAlt = "Flash card image",
    className,
    roundedClassName = "rounded-[28px] md:rounded-[36px]",
    minHeightClassName = "min-h-[220px] sm:min-h-[260px]",
    buttonVariant = "light",
}) => {
    const [from, to] = gradientColors;
    const bg = `bg-gradient-to-r from-${from} to-${to}`;

    const Button = (
        <Link
            href={buttonRoute}
            className={clsx(
                "inline-flex items-center justify-center gap-2",
                "rounded-xl px-6 sm:px-7 py-3.5",
                "text-sm font-semibold transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                buttonVariant === "light"
                    ? "bg-white text-[#2E2A8F] hover:bg-white/90"
                    : "border border-white/70 text-white hover:bg-white/10"
            )}
        >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
        </Link>
    );

    return (
        <section className={clsx("pb-20 bg-white", className)}>
            <div className="container2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={clsx(
                        "relative overflow-hidden shadow-2xl",
                        roundedClassName,
                        img ? "bg-primary" : "",
                        !img ? minHeightClassName : ""
                    )}
                    style={
                        // No img: keep your gradient background like before
                        !img
                            ? { background: `linear-gradient(90deg, ${from} 0%, ${to} 100%)` }
                            : undefined
                    }
                >

                    {!img ? (
                        <div className="py-5">
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

                            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 capitalize stack-md">
                                <motion.h2
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-section-heading !text-white max-w-3xl"
                                >
                                    {title}
                                </motion.h2>

                                {subtitle ? (
                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="mt-stack-sm text-white/80 text-body max-w-xl leading-relaxed capitalize"
                                    >
                                        {subtitle}
                                    </motion.p>
                                ) : null}

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="mt-stack-md capitalize"
                                >
                                    {Button}
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        /*  */
                        <div className="relative min-h-[280px] sm:min-h-[310px] lg:min-h-[360px]">
                            {/* Image */}
                            <div className="absolute inset-y-0 right-0 w-full md:w-[40%]">
                                <div className="relative h-full w-full">
                                    <Image
                                        src={img}
                                        alt={imgAlt}
                                        fill
                                        priority={false}
                                        className="object-cover object-right"
                                        sizes="100vw"
                                    />

                                    {/* Image edge blend */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent md:bg-gradient-to-r md:from-primary md:to-transparent" />
                                </div>
                            </div>
                            {/* Content */}
                            <div className="relative z-10 pt-20 md:pt-10 pb-10 h-full flex items-center ">
                                <div className="w-full lg:w-[70%] px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-20 stack-md">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-white text-h3 font-bold leading-tight max-w-xl capitalize"
                                    >
                                        {title}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="text-white/70 text-body leading-relaxed max-w-md capitalize"
                                    >
                                        {subtitle}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="pt-2 capitalize"
                                    >
                                        {Button}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

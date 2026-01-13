"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type FlashCardProps = {
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonRoute: string;

    /** e.g. ["#4F46E5", "#3B82F6"] or ["rgb(...)", "hsl(...)"] */
    gradientColors: [string, string];

    className?: string;

    /** Optional fine-tuning */
    roundedClassName?: string; // default: rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]
    minHeightClassName?: string; // default: min-h-[220px] sm:min-h-[260px]
    buttonVariant?: "light" | "outline";
};

export const FlashCard: React.FC<FlashCardProps> = ({
    title,
    subtitle,
    buttonText,
    buttonRoute,
    gradientColors,
    className,
    roundedClassName = "rounded-[28px] sm:rounded-[32px] lg:rounded-[40px]",
    minHeightClassName = "min-h-[220px] sm:min-h-[260px]",
    buttonVariant = "light",
}) => {
    const [from, to] = gradientColors;

    return (
        <section className={clsx("py-8 sm:py-12", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        "relative overflow-hidden shadow-2xl",
                        roundedClassName,
                        minHeightClassName
                    )}
                    style={{
                        background: `linear-gradient(90deg, ${from} 0%, ${to} 100%)`,
                    }}
                >
                    {/* subtle glow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
                        <h2 className="text-white font-bold leading-tight text-2xl sm:text-4xl lg:text-5xl max-w-3xl">
                            {title}
                        </h2>

                        {subtitle ? (
                            <p className="mt-4 text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                                {subtitle}
                            </p>
                        ) : null}

                        <div className="mt-8 sm:mt-10">
                            <Link
                                href={buttonRoute}
                                className={clsx(
                                    "inline-flex items-center justify-center gap-2",
                                    "rounded-xl px-6 sm:px-7 py-3.5",
                                    "text-sm font-semibold",
                                    "transition-all duration-300",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                                    buttonVariant === "light"
                                        ? "bg-white text-[#2E2A8F] hover:bg-white/90"
                                        : "border border-white/70 text-white hover:bg-white/10"
                                )}
                            >
                                {buttonText}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

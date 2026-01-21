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
        <section className={clsx("py-8 sm:py-12 bg-whiteh", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        "relative overflow-hidden shadow-2xl",
                        roundedClassName,
                        img ? "bg-black" : "",
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

                            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-16 sm:py-20 capitalize">
                                <h2 className="text-white font-bold leading-tight text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
                                    {title}
                                </h2>

                                {subtitle ? (
                                    <p className="mt-4 text-white/80 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed capitalize">
                                        {subtitle}
                                    </p>
                                ) : null}

                                <div className="mt-8 sm:mt-10 capitalize">{Button}</div>
                            </div>
                        </div>
                    ) : (
                        /*  */
                        <div className="relative min-h-[280px] sm:min-h-[310px] lg:min-h-[360px]">
                            {/* Image */}
                            <div className="absolute inset-y-0 right-0 w-[60%]">
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
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />
                                </div>
                            </div>

                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(90deg, ${from}F2 40%, ${to}CC 70%, transparent 100%)`,
                                }}
                            />
                            <div className="absolute inset-0 bg-black/10" />
                            {/* Content */}
                            <div className="relative z-10 py-10 h-full flex items-center">
                                <div className="w-full lg:w-[70%] px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-20 space-y-5">
                                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight max-w-xl capitalize">
                                        {title}
                                    </h2>

                                    {subtitle ? (
                                        <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md capitalize">
                                            {subtitle}
                                        </p>
                                    ) : null}

                                    <div className="pt-2 capitalize">{Button}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

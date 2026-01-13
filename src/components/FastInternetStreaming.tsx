"use client";

import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

type Content = {
    title: string;
    desc: string;
};

type Props = {
    content: Content;
    imagePath: string;
};

export const FastInternetStreaming = ({ content, imagePath }: Props) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Text */}
                <div className="lg:col-span-6 xl:col-span-5 space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {content.title}
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-prose">
                        {content.desc}
                    </p>

                    <button
                        className={clsx(
                            "inline-flex items-center justify-center gap-3",
                            "uppercase tracking-widest text-xs",
                            "text-gray-900 border border-gray-900/60",
                            "rounded-md px-6 sm:px-7 md:px-9 py-3 md:py-3.5",
                            "transition-all duration-300",
                            "hover:border-gray-900 hover:scale-[1.03]",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2",
                            "active:scale-[0.99]"
                        )}
                    >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Visual */}
                <div className="lg:col-span-6 xl:col-span-7 relative">
                    <div className="relative overflow-visible">
                        <div
                            className={clsx(
                                "relative w-full",
                                "rounded-3xl overflow-hidden shadow-2xl",
                                "aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/9]",
                                "min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]"
                            )}
                        >
                            <Image
                                src={imagePath}
                                alt={content.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Badges */}
                        <Image
                            src="/assets/resources/youtube-streaming.png"
                            alt="YouTube"
                            width={240}
                            height={240}
                            className={clsx(
                                "absolute z-20",
                                "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
                                "w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto drop-shadow-2xl"
                            )}
                        />

                        <Image
                            src="/assets/resources/video-streaming.png"
                            alt="Video"
                            width={240}
                            height={240}
                            className={clsx(
                                "absolute z-20",
                                "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                                "w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto drop-shadow-2xl"
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

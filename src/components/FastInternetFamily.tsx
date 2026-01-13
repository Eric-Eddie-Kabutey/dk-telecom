"use client";

import React from "react";
import Image from "next/image";
import { clsx } from "clsx";

type Content = {
    title: string;
    desc: string;
};

type Props = {
    content: Content;
    imagePath: string;
};

export const FastInternetFamily = ({ content, imagePath }: Props) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-2xl bg-black">
                <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px]">
                    {/* Image */}
                    <div className="absolute inset-y-0 right-0 w-full">
                        <div className="relative h-full w-full">
                            <Image
                                src={imagePath}
                                alt={content.title}
                                fill
                                priority
                                className="object-cover object-right"
                                sizes="100vw"
                            />

                            {/* Image edge blend */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80" />
                        </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="w-full lg:w-[70%] px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-20 space-y-5">
                            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
                                {content.title}
                            </h2>

                            <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                                {content.desc}
                            </p>

                            <button
                                className={clsx(
                                    "inline-flex items-center justify-center",
                                    "uppercase tracking-widest text-xs",
                                    "text-white border border-white/60",
                                    "rounded-full px-7 md:px-9 py-3 md:py-3.5",
                                    "transition-all duration-300",
                                    "hover:border-white hover:bg-white/10 hover:scale-[1.03]",
                                    "active:scale-[0.99]",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                )}
                            >
                                Explore now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

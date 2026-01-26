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
        <div className="container">
            <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-2xl bg-black">
                <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px]">
                    {/* Image */}
                    <div className="absolute inset-y-0 right-0 w-full">
                        <div className="relative flex flex-col md:flex-row justify-end h-full w-full">
                            <div className="w-0 md:w-[50%]"></div>
                            <Image
                                src={imagePath}
                                alt={content.title}
                                priority
                                className="object-cover object-right w-full md:w-[60%] h-[100%]"
                                width={400}
                                height={20}
                            />

                            {/* Image edge blend */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black md:bg-gradient-to-l md:from-transparent md:via-black/90 md:to-black" />
                        </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black md:bg-gradient-to-r md:from-black/95 md:via-black/75 md:to-transparent" />
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="w-full lg:w-[70%] px-6 sm:px-10 lg:px-14 pt-32 sm:pt-10 lg:pt-20 pb-10 sm:pb-14 lg:pb-20 space-y-5">    
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

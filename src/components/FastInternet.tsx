"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";
import { clsx } from "clsx";

interface FastInternetProps {
    variant?: "family" | "streaming";
}

export const FastInternet = ({ variant = "family" }: FastInternetProps) => {
    const { text } = useSiteMode();

    const content = variant === "family" ? text.fastInternet.family : text.fastInternet.streaming;
    const imagePath = variant === "family"
        ? "/assets/resources/fast-internet-for-the-whole-family-img.png"
        : "/assets/resources/fast-internet-built-for-everyday-smooth-streaming-img.png";

    return (
        <section className={clsx("py-24", variant === "streaming" ? "bg-gray-50" : "bg-white")}>
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className={clsx("space-y-8", variant === "streaming" ? "lg:order-2" : "lg:order-1")}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        {content.title}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                        {content.desc}
                    </p>

                    {variant === "streaming" && (
                        <div className="flex items-center space-x-6 pt-4">
                            <Image src="/assets/resources/youtube-streaming.png" alt="YouTube" width={100} height={40} className="grayscale hover:grayscale-0 transition-all" />
                            <Image src="/assets/resources/video-streaming.png" alt="Video" width={100} height={40} className="grayscale hover:grayscale-0 transition-all" />
                        </div>
                    )}

                    <button className="btn-primary">
                        Learn More
                    </button>
                </div>

                <div className={clsx("relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700", variant === "streaming" ? "lg:order-1" : "lg:order-2")}>
                    <Image
                        src={imagePath}
                        alt={content.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="text-center mt-12 text-xs text-gray-300">
                Visual Reference: {variant === "family" ? "fast-internet.png" : "streaming.png"}
            </div>
        </section>
    );
};

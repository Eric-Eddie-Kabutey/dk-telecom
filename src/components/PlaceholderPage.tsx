"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";

interface PlaceholderPageProps {
    titleKey: string;
}

export const PlaceholderPage = ({ titleKey }: PlaceholderPageProps) => {
    const { text } = useSiteMode();
    // @ts-ignore
    const title = text.placeholders[titleKey] || "Page";

    return (
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 text-white text-center overflow-hidden">
            <div className="absolute inset-0 bg-hero -z-20"></div>
            <div className="absolute inset-0 bg-black/50 -z-10"></div>

            <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg animate-in fade-in zoom-in duration-700">
                {title}
            </h1>
            <p className="mt-8 text-xl text-white/90 max-w-2xl leading-relaxed">
                We are building something amazing here. Explore our premium connectivity solutions tailored just for you.
            </p>

            <div className="mt-12 w-24 h-1 bg-blue-500 rounded-full"></div>
        </div>
    );
};

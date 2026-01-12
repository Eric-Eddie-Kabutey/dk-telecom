"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";

export const Hero = () => {
    const { text } = useSiteMode();

    return (
        <section className="relative min-h-[100vh] flex items-center bg-hero overflow-hidden">
            <div className="absolute inset-0 bg-black/10 z-0"></div>
            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-md">
                        {text.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-lg drop-shadow-sm">
                        {text.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-xl">
                            {text.hero.ctaPrimary}
                        </button>
                        <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                            {text.hero.ctaSecondary}
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block relative h-[600px] animate-in fade-in zoom-in duration-1000 delay-200">
                    {/* Optionally add a decorative element here */}
                </div>
            </div>
        </section>
    );
};

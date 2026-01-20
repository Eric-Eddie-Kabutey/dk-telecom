"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";

export const HeroMain = () => {
    const { text } = useSiteMode();

    return (
        <section className="relative w-[100vw] min-h-[100vh] flex flex-col justify-around items-center bg-hero overflow-hidden">
            <div className=" bg-black/10">
            </div>
            <div className="max-w-[1800px] w-full relative z-10 items-center px-10">
                <div className="w-full md:w-[80%] lg:w-[50%] text-white space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <h1 className="text-5xl md:text-xl font-bold leading-tight drop-shadow-md">
                        {text.hero.title}
                    </h1>
                    <h1 className="text-4xl lg:text-4xl xl:text-6xl text-white/90 drop-shadow-sm">
                        {text.hero.subtitle}
                    </h1>
                    {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-xl">
                            {text.hero.ctaPrimary}
                        </button>
                        <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                            {text.hero.ctaSecondary}
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="max-w-[1800px] w-full pl-6 pr-20 animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="relative w-full flex flex-row justify-between items-center px-20 py-4 bg-white/20 backdrop-blur-xs rounded-3xl">
                    <div className="flex flex-row justify-center items-center gap-2.5">
                        <div className="w-7 h-7 bg-dark rounded-full"></div>
                        <div className="w-5 h-5 bg-black/20 rounded-full"></div>
                        <div className="w-5 h-5 bg-black/20 rounded-full"></div>
                    </div>
                    <button className="bg-transparent border px-10 py-4 rounded-full uppercase text-white font-normal text-md transition-all hover:scale-105 shadow-xl">
                        {text.hero.ctaPrimary}
                    </button>
                    <div></div>
                    <div className="absolute -top-10 -right-10">
                        <Link
                            href="https://wa.me/1234567890"
                            target="_blank"
                            className="flex items-center space-x-2 bg-[#00D539] text-white px-6 py-6 rounded-full hover:bg-green-600 transition-colors"
                        >
                            <Image src="/assets/resources/whatsapp-icon.svg" alt="WhatsApp" width={50} height={60} />
                            {/* <span className="hidden sm:inline">WhatsApp</span> */}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";
import clsx from "clsx";
import { Check } from "lucide-react";

export const HeroMain = () => {
    const { text } = useSiteMode();

    return (
        <section className="relative w-[100vw] min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
            {/* ✅ Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={text.hero.heroImg}
                    alt={text.hero.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* overlays (optional but recommended for readability) */}
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
            </div>

            <div className="max-w-[1800px] w-full relative z-10 items-center px-10">
                <div className="w-full md:w-[80%] lg:w-[50%] text-white space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <h1 className="text-5xl md:text-xl font-bold leading-tight drop-shadow-md">
                        {text.hero.title}
                    </h1>
                    <h1 className="text-4xl lg:text-4xl xl:text-6xl text-white/90 drop-shadow-sm">
                        {text.hero.subtitle}
                    </h1>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                        {(text.hero.features ?? []).slice(0, 4).map((f, i) => (
                            <div
                                key={`${text.hero.title}-${i}`}
                                className={clsx(
                                    "flex items-center gap-2.5",
                                    "rounded-xl px-3 py-2.5",
                                    "bg-white/10 border border-white/10 backdrop-blur-md"
                                )}
                            >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/10">
                                    <Check className="h-3.5 w-3.5 text-white" />
                                </span>
                                <span className="text-white/90 text-xs sm:text-sm font-medium leading-snug">
                                    {f.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h1 className="font-light text-4xl">
                        D <span className="font-bold text-6xl">{text.hero.price.amount}</span> /{" "}
                        <span className="font-normal text-5xl">{text.hero.price.duration}</span>
                    </h1>
                </div>
            </div>

            <div className="absolute bottom-20 max-w-[1800px] w-full pl-6 pr-20 z-10 animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="relative w-full flex flex-row justify-between items-center px-20 py-4 bg-white/20 backdrop-blur-xs rounded-3xl">
                    <div className="flex flex-row justify-center items-center gap-2.5">
                        <div className="w-7 h-7 bg-dark rounded-full"></div>
                        <div className="w-5 h-5 bg-black/20 rounded-full"></div>
                        <div className="w-5 h-5 bg-black/20 rounded-full"></div>
                    </div>

                    <button className="bg-transparent border px-10 py-4 rounded-full uppercase text-white font-normal text-md transition-all hover:scale-105 shadow-xl">
                        {text.hero.ctaPrimary}
                    </button>

                    <div />

                    <div className="absolute -top-10 -right-10">
                        <Link
                            href="https://wa.me/1234567890"
                            target="_blank"
                            className="flex items-center space-x-2 bg-[#00D539] text-white px-6 py-6 rounded-full hover:bg-green-600 transition-colors"
                        >
                            <Image
                                src="/assets/resources/whatsapp-icon.svg"
                                alt="WhatsApp"
                                width={50}
                                height={60}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

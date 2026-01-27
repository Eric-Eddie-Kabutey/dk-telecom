"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Check, ArrowRight } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";

export const FamilyPlus = () => {
    const { text } = useSiteMode();

    // pulls from content/residential.json (as you described)
    const familyPlus = text?.familyPlus;

    if (!familyPlus) return null;

    return (
        <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[40px] shadow-2xl">
                    {/* base bg */}
                    <div className="absolute inset-0 bg-[#14146A]" />

                    {/* left image */}
                    <div className="absolute inset-y-0 left-0 w-full lg:w-[48%]">
                        <Image
                            src={familyPlus.img}
                            alt={familyPlus.title}
                            fill
                            priority
                            className="object-cover object-left"
                            sizes="(max-width: 1024px) 100vw, 48vw"
                        />

                        {/* smooth blend into right */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(20,20,106,0.20) 0%, rgba(20,20,106,0.72) 55%, rgba(20,20,106,1) 100%)",
                            }}
                        />
                    </div>

                    {/* content */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
                        <div className="hidden lg:block lg:col-span-5" />

                        <div className="lg:col-span-7 px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14 stack-md">
                            <p className="text-section-subheading !text-white/75 !mb-0">
                                {familyPlus.tagline}
                            </p>

                            <h2 className="mt-3 text-white text-h2 font-bold leading-tight max-w-2xl">
                                {familyPlus.title}
                            </h2>

                            {/* features */}
                            <div className="mt-stack-md grid grid-cols-1 sm:grid-cols-2 fluid-gap">
                                {(familyPlus.features ?? []).map((f: { title: string }, i: number) => (
                                    <div
                                        key={`${f.title}-${i}`}
                                        className={clsx(
                                            "flex items-center gap-3",
                                            "rounded-xl px-4 py-3",
                                            "bg-white/10 border border-white/10",
                                            "backdrop-blur-md"
                                        )}
                                    >
                                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary border border-white/10">
                                            <Check className="h-4 w-4 text-white" />
                                        </span>
                                        <span className="text-white/90 text-small font-medium capitalize">
                                            {f.title}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-stack-md">
                                <button
                                    type="button"
                                    className={clsx(
                                        "inline-flex items-center gap-2",
                                        "rounded-xl px-5 py-3",
                                        "text-white text-button",
                                        "border border-white/25 bg-white/0",
                                        "transition-all duration-300",
                                        "hover:bg-white/10 hover:border-white/35",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14146A]"
                                    )}
                                >
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Speed badge (static for now) */}
                    <div
                        className={clsx(
                            "absolute z-20",
                            "left-5 sm:left-8 bottom-6 sm:bottom-8",
                            "lg:left-[24%] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto",
                            "h-[110px] w-[110px] sm:h-[132px] sm:w-[132px]",
                            "rounded-full border-[5px] border-white",
                            "shadow-[0_18px_40px_rgba(0,0,0,0.35)]",

                        )}
                    >
                        {/* Gradient fill + glassy look */}
                        <div
                            className={clsx(
                                "relative h-full w-full rounded-full",
                                "bg-gradient-to-br from-[#5B5BFF] via-[#6C5CE7] to-[#2E2A8F]",
                                "backdrop-blur-xl"
                            )}
                        >
                            {/* subtle inner glow */}
                            {/* <div className="absolute inset-[10px] rounded-full border border-white/25" /> */}

                            {/* top-left highlight */}
                            {/* <div className="absolute -top-2 -left-2 h-14 w-14 rounded-full bg-white/20 blur-xl" /> */}

                            {/* content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-end gap-1 rotate-[8deg]">

                                    <span className="text-white text-display font-extrabold leading-none">
                                        10
                                    </span>
                                    <span className="text-white/90 text-overline pb-2">
                                        MBPS
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/15" />
                </div>
            </div>
        </section>
    );
};

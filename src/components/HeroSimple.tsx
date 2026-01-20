"use client";

import React from "react";
import Image from "next/image";

interface HeroSimpleProps {
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt?: string;
}

export const HeroSimple = ({
    tag,
    title,
    subtitle,
    image,
    imageAlt = "Hero background",
}: HeroSimpleProps) => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
            {/* Background Image */}
            <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1800px] px-10">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <h1 className="text-xl uppercase text-white/90 font-medium leading-tight drop-shadow-md">
                        {tag}
                    </h1>

                    <h2 className="font-bold text-6xl capitalize text-white drop-shadow-sm leading-tight">
                        {title}
                    </h2>

                    <p className="font-extralight text-xl text-white drop-shadow-sm">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
};

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
        <section className="relative h-full  w-full overflow-hidden flex ">

            <div className="absolute inset-0">
                {/* Background Image */}
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>


            {/* Content */}
            <div className="container relative z-10">
                <div className="my-[200px] max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <h1 className="text-h6 uppercase !text-white !mb-4">
                        {tag}
                    </h1>

                    <h2 className="text-h1 md:text-h1 text-extrabold text-white capitalize">
                        {title}
                    </h2>

                    <p className="text-h4 text-white capitalize font-extralight">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
};

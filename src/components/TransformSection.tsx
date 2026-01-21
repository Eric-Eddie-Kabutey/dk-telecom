"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { TransformCard } from "@/components/TransformCard";

type TransformIdea = {
    id: number;
    title: string;
    subtitle: string;
};

type TransformData = {
    title: string;
    img: string;
    ideas: TransformIdea[];
};

type TransformSectionProps = {
    className?: string;
    id?: string;
};

export const TransformSection: React.FC<TransformSectionProps> = ({
    className,
    id = "transform",
}) => {
    const { text } = useSiteMode();
    const transform = text?.transform as TransformData;

    if (!transform) return null;

    return (
        <section id={id} className={clsx("w-full pt-40", className)}>
            <div className="">
                <div className="relative">
                    {/* background image */}
                    <div className="absolute inset-0">
                        <Image
                            src={transform.img}
                            alt={transform.title}
                            fill
                            priority={false}
                            className="object-cover object-center"
                            sizes="100vw"
                        />

                        {/* overlays */}
                        <div className="absolute inset-0 bg-black/35" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/70" />
                    </div>

                    {/* content */}
                    <div className="container relative z-10 ">
                        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center capitalize pt-48">
                            {transform.title}
                        </h2>

                        <div className="mt-7 sm:mt-9 pb-28 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {(transform.ideas ?? []).map((idea) => (
                                <TransformCard key={idea.id} idea={idea} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

type Thing = {
    id: number;
    title: string;
    body: string;
    type: "simple" | "detailed";
    img?: string;  // illustration around
    img2?: string; // user icons strip
};

type ThingCardProps = {
    thing: Thing;
    className?: string;
};

export const ThingCard: React.FC<ThingCardProps> = ({ thing, className }) => {
    if (thing.type === "simple") {
        return (
            <article className={clsx("w-full rounded-2xl bg-white p-4 sm:p-5", className)}>
                <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 aspect-[16/9]">
                    <Image
                        src={thing.img ?? "/assets/resources/placeholder.png"}
                        alt={thing.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                </div>

                <h3 className="mt-6 capitalize text-base font-semibold text-gray-900">
                    {thing.title}
                </h3>

                <p className=" capitalize text-sm text-gray-600 leading-relaxed">
                    {thing.body}
                </p>
            </article>
        );
    }

    // ✅ Detailed (blue) — title + body + 2 layered images
    return (
        <article
            className={clsx(
                "relative w-full overflow-hidden rounded-2xl bg-primary-dark text-white",
                className
            )}
        >
            <div className="p-6 sm:p-7">
                <h3 className="text-lg capitalize font-semibold">{thing.title}</h3>
                <p className=" capitalize text-sm text-white/85 leading-relaxed max-w-sm">
                    {thing.body}
                </p>
            </div>

            {/* Visual area (bottom) */}
            <div className="relative w-full h-[150px]">
                {/* img = illustration around (background-ish) */}
                {thing.img ? (
                    <Image
                        src={thing.img}
                        alt={`${thing.title} illustration`}
                        fill
                        className="object-contain"
                        priority={false}
                    />
                ) : null}

                {/* img2 = user icons strip (foreground-ish) */}
                {thing.img2 ? (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[20%]">
                        <Image
                            src={thing.img2}
                            alt={`${thing.title} avatars`}
                            fill
                            className="object-contain "
                            priority={false}
                        />
                    </div>
                ) : null}
            </div>
        </article>
    );
};

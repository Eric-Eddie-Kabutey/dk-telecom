"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type ServiceCardProps = {
    title: string;
    img: string;
    href?: string;
    className?: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    img,
    href,
    className,
}) => {
    const Card = (
        <div
            className={clsx(
                "group relative h-full w-full overflow-hidden rounded-3xl",
                className
            )}
        >
            <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                className={clsx(
                    "object-cover",
                    "transition-transform duration-700 ease-out",
                    "group-hover:scale-105"
                )}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

            {/* title */}
            <div className="absolute bottom-14 left-4 right-4">
                <p className="text-white text-h4 font-bold leading-tight drop-shadow-sm">
                    {title}
                </p>
            </div>
        </div>
    );

    if (!href) return Card;

    return (
        <Link href={href} className="block h-full w-full">
            {Card}
        </Link>
    );
};

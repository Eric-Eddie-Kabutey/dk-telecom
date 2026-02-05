"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

type TeamMemberCardProps = {
    img: string;
    name: string;
    position: string;
    className?: string;
};

export const Member: React.FC<TeamMemberCardProps> = ({
    img,
    name,
    position,
    className,
}) => {
    return (
        <div className={clsx("flex flex-col items-center text-center", className)}>
            <div className="relative w-full h-44 sm:h-48 md:h-52 overflow-hidden rounded-2xl">
                <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                />
            </div>

            <h3 className="mt-6 text-h4 font-bold text-gray-900">{name}</h3>
            <p className="mt-1 text-overline text-gray-500">
                {position}
            </p>
        </div>
    );
};

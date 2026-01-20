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
            <div className="relative h-44 w-72 sm:h-48 sm:w-80 md:h-52 md:w-96 overflow-hidden rounded-2xl">
                <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                />
            </div>

            <h3 className="mt-6 text-base font-semibold text-gray-900">{name}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-500">
                {position}
            </p>
        </div>
    );
};

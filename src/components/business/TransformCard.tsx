"use client";

import React from "react";
import clsx from "clsx";
import { Gauge, Cloud, Headset } from "lucide-react";
import { splitTextInTwoLines } from "@/utils/utils";

type TransformIdea = {
    id: number;
    title: string;
    subtitle: string;
};

type TransformCardProps = {
    idea: TransformIdea;
    className?: string;
};

const pickIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("data")) return Cloud;
    if (t.includes("support")) return Headset;
    return Gauge;
};

export const TransformCard: React.FC<TransformCardProps> = ({ idea, className }) => {
    const Icon = pickIcon(idea.title);
    const [t1, t2] = splitTextInTwoLines(idea.title);
    const [s1, s2] = splitTextInTwoLines(idea.subtitle);

    return (
        <article
            className={clsx(
                "group relative w-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl",
                "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                "px-6 py-7 text-center",
                "transition duration-300 hover:bg-white/12 hover:border-white/25 hover:-translate-y-1",
                className
            )}
        >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
                <Icon className="text-white" size={26} />
            </div>

            <h3 className="mt-4 text-h4 font-bold text-white leading-snug">
                {t1} <br /> {t2}
            </h3>

            <p className="mt-3 text-body text-white/75 leading-relaxed line-clamp-2">
                {s1} <br /> {s2}
            </p>
        </article>
    );
};

"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { DollarSign, Code2, Briefcase, CalendarDays } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { slugify } from "@/utils/slugify";

type Role = {
    id: number;
    unit: string;
    type: string;
    title: string;
    description: string;
    date: string;
};

type RoleCardProps = {
    role: Role;
    className?: string;
};

function getUnitIcon(unit: string) {
    const u = unit.toLowerCase();

    if (u.includes("finance")) return DollarSign;
    if (u.includes("software") || u.includes("engineering") || u.includes("developer"))
        return Code2;
    return Briefcase;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, className }) => {
    const Icon = getUnitIcon(role.unit);
    const { mode } = useSiteMode();
    const slug = slugify(role.title);

    return (
        <Link
            href={`/${mode}/career/${slug}`}
            className={clsx(
                "flex flex-col justify-between w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/30 stack-sm",
                className
            )}
        >
            <div>
                {/* Unit row */}
                <div className="flex items-center gap-2 text-small text-dark/80">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                        <Icon size={16} />
                    </span>
                    <span className="font-bold capitalize">{role.unit}</span>
                </div>

                {/* Type chip */}
                <div className="mt-stack-sm">
                    <span className="inline-flex rounded-md bg-gray-100 px-3 py-1 text-caption font-medium text-gray-700">
                        {role.type}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mt-stack-md text-h4 font-bold text-dark capitalize leading-snug">
                    {role.title}
                </h3>

                {/* Description */}
                <p className="mt-stack-sm text-body text-dark/70 leading-relaxed line-clamp-3">
                    {role.description}
                </p>
            </div>

            {/* Date */}
            <div className="mt-stack-md flex items-center gap-2 text-small text-gray-500">
                <CalendarDays size={16} />
                <span className="capitalize">{role.date}</span>
            </div>
        </Link>
    );
};

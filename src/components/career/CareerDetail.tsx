"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { DollarSign, Code2, Briefcase, CalendarDays, ArrowLeft } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";

type Role = {
    id: number;
    unit: string;
    type: string;
    title: string;
    description: string;
    date: string;
};

type CareerDetailProps = {
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

export const CareerDetail: React.FC<CareerDetailProps> = ({ role, className }) => {
    const Icon = getUnitIcon(role.unit);
    const { mode } = useSiteMode();

    return (
        <div className={clsx("w-full pb-20 pt-40", className)}>
            <div className="container max-w-4xl">
                {/* Back button */}
                <Link
                    href={`/${mode}/career`}
                    className="inline-flex items-center gap-2 text-button text-gray-600 hover:text-gray-900 transition mb-8"
                >
                    <ArrowLeft size={18} />
                    Back to Careers
                </Link>

                {/* Role header */}
                <div className="stack-md">
                    <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Icon size={24} className="text-primary" />
                        </span>
                        <div>
                            <span className="inline-flex rounded-md bg-gray-100 px-3 py-1 text-caption font-medium text-gray-700">
                                {role.type}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-h1 font-bold text-dark capitalize leading-tight">
                        {role.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-body text-gray-600">
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} />
                            <span className="capitalize">{role.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} />
                            <span className="capitalize">{role.date}</span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-10 border-gray-200" />

                {/* Role description */}
                <div className="stack-lg">
                    <div>
                        <h2 className="text-h3 font-bold text-dark mb-4">About the Role</h2>
                        <p className="text-body text-dark/80 leading-relaxed">
                            {role.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-h3 font-bold text-dark mb-4">What We Offer</h2>
                        <ul className="space-y-3 text-body text-dark/80">
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Meaningful work with real impact on communities across The Gambia</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Hands-on experience and professional development opportunities</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Supportive team culture that values collaboration and growth</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Competitive compensation and benefits package</span>
                            </li>
                        </ul>
                    </div>

                    {/* Apply CTA */}
                    <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
                        <h3 className="text-h3 font-bold mb-3">Ready to Apply?</h3>
                        <p className="text-body mb-6 opacity-90">
                            Join our team and help build the future of connectivity in The Gambia.
                        </p>
                        <Link
                            href={`/${mode}/contact`}
                            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-button font-semibold text-primary hover:bg-gray-50 transition"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

"use client";

import React from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { FileText, Cloud, Globe, Gauge } from "lucide-react";

type Benefit = {
    id: number;
    title: string;
    icon: string; // "File" | "Cloud" | "Globe" | "Meter"
};

type BenefitsProps = {
    className?: string;
    id?: string;
};

const ICONS: Record<string, React.ElementType> = {
    File: FileText,
    Cloud: Cloud,
    Globe: Globe,
    Meter: Gauge,
};

export const Benefits: React.FC<BenefitsProps> = ({ className, id = "benefits" }) => {
    const { text } = useSiteMode();

    const benefits = (text?.packages?.benefits ?? []) as Benefit[];
    if (!benefits.length) return null;

    return (
        <section id={id} className={clsx("w-full py-20", className)}>
            <div className="container">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    {benefits.map((b) => {
                        const Icon = ICONS[b.icon] ?? FileText;

                        return (
                            <div key={b.id} className="flex flex-col items-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <Icon className="text-primary" size={26} />
                                </div>
                                <p className="mt-4 text-sm font-medium text-gray-800 capitalize">
                                    {b.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

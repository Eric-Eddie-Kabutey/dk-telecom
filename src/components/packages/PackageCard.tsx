"use client";

import React from "react";
import clsx from "clsx";
import { Check, ArrowRight } from "lucide-react";

type PriceItem = {
    id: number;
    title: string;
    price: string;
    billing: "monthly" | "yearly";
};

export type PackageItem = {
    id: number;
    type: string;
    bandwidth: string;
    for: string;
    tags: string[];
    prices: PriceItem[];
    colors?: string[];
    popular?: boolean;
};

type PackageCardProps = {
    pkg: PackageItem;
    billing: "monthly" | "yearly";
    className?: string;
    onSelect?: (pkg: PackageItem) => void;
};

export const PackageCard: React.FC<PackageCardProps> = ({
    pkg,
    billing,
    className,
    onSelect,
}) => {
    const isPopular = Boolean(pkg.popular);

    // Switch price list based on billing
    const priceItems = (pkg.prices ?? []).filter((p) => p.billing === billing);

    return (
        <article
            className={clsx(
                "w-full overflow-hidden rounded-2xl border shadow-sm transition",
                isPopular
                    ? "border-transparent bg-[#121C2E] text-white"
                    : "border-gray-200 bg-white text-gray-900",
                className
            )}
        >
            {/* Header */}
            <div className={clsx("p-6 sm:p-7", isPopular ? "" : "border-b border-gray-200")}>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className={clsx("text-xs tracking-wide uppercase", isPopular ? "text-white/70" : "text-gray-600")}>
                            {pkg.type}
                        </p>

                        <h3 className={clsx("mt-2 text-h3 font-bold leading-none")}>
                            {pkg.bandwidth.toUpperCase()}<span className="text-body uppercase ml-1">mbps</span>
                        </h3>

                        <p className={clsx("mt-2 text-[10px] uppercase tracking-wide", isPopular ? "text-white/70" : "text-gray-600")}>
                            {pkg.for}
                        </p>
                    </div>

                    {isPopular && (
                        <span className="rounded-full bg-primary/90 px-4 py-2 text-xs font-semibold text-white">
                            Most Popular
                        </span>
                    )}
                </div>
            </div>

            {/* Features */}
            <div className={clsx("p-6 sm:p-7", isPopular ? "bg-[#1A2740]" : "bg-gray-50")}>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(pkg.tags ?? []).map((t, i) => (
                        <li key={`${pkg.id}-${i}`} className="flex justify-start items-start gap-3">
                            <span
                                className={clsx(
                                    "mt-0.5 inline-flex p-[0.15rem] items-center justify-center rounded-full",
                                    isPopular ? "bg-emerald-600/90" : "bg-primary/90"
                                )}
                            >
                                <Check size={14} className="text-white" />
                            </span>

                            <span className={clsx("text-small capitalize", isPopular ? "text-white/90" : "text-gray-700")}>
                                {t}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Prices */}
            <div className={clsx("p-6 sm:p-7", isPopular ? "bg-[#1A2740]" : "bg-gray-50")}>
                <div className={clsx("pt-5", isPopular ? "border-t border-white/10" : "border-t border-gray-200")}>
                    <div className="space-y-3">
                        {priceItems.slice(0, 1).map((p) => (
                            <div key={p.id} className="flex items-end justify-between gap-4">
                                <span className={clsx("text-xs capitalize tracking-wide", isPopular ? "text-white/70" : "text-gray-600")}>
                                    {p.title}
                                </span>

                                <span className={clsx("font-bold", isPopular ? "text-h2" : "text-h3")}>
                                    {p.price}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => onSelect?.(pkg)}
                        className={clsx(
                            "mt-6 w-full rounded-xl px-5 py-4 text-button transition inline-flex items-center justify-center gap-2",
                            "bg-primary text-white hover:opacity-95"
                        )}
                    >
                        Get Started <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </article>
    );
};


// {
//                             "id": 1,
//                             "title": "router (one time)",
//                             "price": "D 5,000"
//                         },
"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { PackageCard, PackageItem } from "@/components/PackageCard";

type PackageListProps = {
    className?: string;
    id?: string;
};

export const PackageList: React.FC<PackageListProps> = ({
    className,
    id = "packages",
}) => {
    const { text } = useSiteMode();

    const packageSection = text?.packages?.packageSection as {
        title: string;
        packageList: PackageItem[];
    };

    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    const packages = useMemo(() => packageSection?.packageList ?? [], [packageSection]);

    if (!packageSection) return null;

    const handleSelect = (pkg: PackageItem) => {
        // put your routing / modal here later 😄
        console.log("Selected package:", pkg);
    };

    return (
        <section id={id} className={clsx("w-full py-20", className)}>
            <div className="container">
                {/* Title */}
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 capitalize">
                    {packageSection.title}
                </h2>

                {/* Toggle */}
                <div className="mt-7 flex justify-center">
                    <div className="inline-flex rounded-full bg-gray-100 p-1">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={clsx(
                                "rounded-full px-6 py-3 text-sm font-medium transition",
                                billing === "monthly" ? "bg-white shadow text-gray-900" : "text-gray-600"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling("yearly")}
                            className={clsx(
                                "rounded-full px-6 py-3 text-sm font-medium transition",
                                billing === "yearly" ? "bg-white shadow text-gray-900" : "text-gray-600"
                            )}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
                    {packages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            billing={billing}
                            onSelect={handleSelect}
                            className={clsx(
                                // 🔥 pop the popular card on desktop like the screenshot
                                pkg.popular ? "lg:-mt-6 lg:scale-[1.03]" : "lg:mt-0",
                                "transform"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { PackageCard, PackageItem } from "@/components/packages/PackageCard";

type PackageListProps = {
    className?: string;
    id?: string;
};

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
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
        console.log("Selected package:", pkg);
    };

    return (
        <section id={id} className={clsx("w-full py-20", className)}>
            <div className="container p-0">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-3xl sm:text-4xl font-bold text-gray-900 capitalize"
                >
                    {packageSection.title}
                </motion.h2>

                {/* Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-7 flex justify-center"
                >
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
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
                >
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            variants={itemVariants}
                            className={clsx(
                                pkg.popular ? "lg:-mt-6 lg:scale-[1.03]" : "lg:mt-0",
                                "transform"
                            )}
                        >
                            <PackageCard
                                pkg={pkg}
                                billing={billing}
                                onSelect={handleSelect}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

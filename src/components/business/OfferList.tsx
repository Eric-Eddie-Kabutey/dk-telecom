"use client";

import { motion, Variants } from "framer-motion";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { Offer, OfferItem } from "@/components/home/Offer";

type OffersData = {
    title: string;
    offerslist: OfferItem[];
};

type OfferListProps = {
    className?: string;
    id?: string;
    requestHref?: string;
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const OfferList: React.FC<OfferListProps> = ({
    className,
    id = "offers",
    requestHref = "/",
}) => {
    const { text, mode } = useSiteMode();
    const offers = text?.offers as OffersData;

    if (!offers) return null;

    const [left, topRight, bottomRight] = offers.offerslist ?? [];

    return (
        <section id={id} className={clsx("w-full section-py", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end md:items-center justify-between gap-4"
                >
                    <h2 className="text-section-heading capitalize">
                        {offers.title}
                    </h2>

                    <Link
                        href={requestHref}
                        className={clsx(
                            "inline-flex items-center gap-2",
                            "rounded-xl border border-gray-300 bg-white",
                            "px-4 sm:px-5 py-2.5",
                            "text-button text-gray-800",
                            "hover:bg-gray-50 transition"
                        )}
                    >
                        Request Installation <ArrowRight size={18} />
                    </Link>
                </motion.div>

                {/* ✅ Layout starts at md (tablet) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-stack-lg grid grid-cols-1 fluid-gap md:grid-cols-12 md:grid-rows-2"
                >
                    {/* Left big card spans both rows */}
                    {left ? (
                        <motion.div variants={itemVariants} className="md:col-span-5 md:row-span-2">
                            <Offer
                                offer={left}
                                size="lg"
                                imageSide="bottom"
                                contentSide="top"
                                badgePosition="bottom-right"
                                badgeRotation="-8deg"
                                className="h-full"
                                page="business"
                                ctaHref={`/${mode}/packages`}
                            />
                        </motion.div>
                    ) : null}

                    {/* Top right */}
                    {topRight ? (
                        <motion.div variants={itemVariants} className="md:col-span-7 md:row-span-1">
                            <Offer
                                offer={topRight}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                                ctaHref={`/${mode}/packages`}
                            />
                        </motion.div>
                    ) : null}

                    {/* Bottom right (green badge on left like screenshot) */}
                    {bottomRight ? (
                        <motion.div variants={itemVariants} className="md:col-span-7 md:row-span-1">
                            <Offer
                                offer={bottomRight}
                                size="sm"
                                imageSide="left"
                                contentSide="right"
                                badgePosition="top-left"
                                badgeRotation="-8deg"
                                className="h-full"
                                ctaHref={`/${mode}/packages`}
                            />
                        </motion.div>
                    ) : null}
                </motion.div>
            </div>
        </section>
    );
};

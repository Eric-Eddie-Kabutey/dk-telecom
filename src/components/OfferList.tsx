"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { Offer, OfferItem } from "@/components/Offer";

type OffersData = {
    title: string;
    offerslist: OfferItem[];
};

type OfferListProps = {
    className?: string;
    id?: string;
    requestHref?: string;
};

export const OfferList: React.FC<OfferListProps> = ({
    className,
    id = "offers",
    requestHref = "/",
}) => {
    const { text } = useSiteMode();
    const offers = text?.offers as OffersData;

    if (!offers) return null;

    const [left, topRight, bottomRight] = offers.offerslist ?? [];

    return (
        <section id={id} className={clsx("w-full", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                        {offers.title}
                    </h2>

                    <Link
                        href={requestHref}
                        className={clsx(
                            "inline-flex items-center gap-2",
                            "rounded-xl border border-gray-300 bg-white",
                            "px-4 sm:px-5 py-2.5",
                            "text-sm font-medium text-gray-800",
                            "hover:bg-gray-50 transition"
                        )}
                    >
                        Request Installation <ArrowRight size={18} />
                    </Link>
                </div>

                {/* ✅ Layout starts at md (tablet) */}
                <div className="mt-10 grid grid-cols-1 gap-6 md:gap-4 md:grid-cols-12 md:grid-rows-2">
                    {/* Left big card spans both rows */}
                    {left ? (
                        <div className="md:col-span-5 md:row-span-2">
                            <Offer
                                offer={left}
                                size="lg"
                                imageSide="bottom"
                                contentSide="top"
                                badgePosition="bottom-right"
                                badgeRotation="-8deg"
                                className="h-full"
                            />
                        </div>
                    ) : null}

                    {/* Top right */}
                    {topRight ? (
                        <div className="md:col-span-7 md:row-span-1">
                            <Offer
                                offer={topRight}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                            />
                        </div>
                    ) : null}

                    {/* Bottom right (green badge on left like screenshot) */}
                    {bottomRight ? (
                        <div className="md:col-span-7 md:row-span-1">
                            <Offer
                                offer={bottomRight}
                                size="sm"
                                imageSide="left"
                                contentSide="right"
                                badgePosition="top-left"
                                badgeRotation="-8deg"
                                className="h-full"
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

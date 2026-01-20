"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { ServiceCard } from "@/components/ServiceCard";

type ServiceItem = {
    id: number;
    title: string;
    img: string;
    href?: string;
};

type ServiceListProps = {
    className?: string;
    id?: string;
};

const SPAN_CLASSES = [
    "sm:row-span-6", // 0 big (left)
    "sm:row-span-5", // 1 medium (right)
    "sm:row-span-7", // 2 tall (left)
    "sm:row-span-6", // 3 tall-ish (right)
    "sm:row-span-5", // 4 medium (left)
    "sm:row-span-5", // 5 medium (right)
] as const;

export const ServiceList: React.FC<ServiceListProps> = ({
    className,
    id = "service-list",
}) => {
    const { text } = useSiteMode();

    const serviceList = text?.services?.serviceList as {
        title: string;
        list: ServiceItem[];
    };

    const [activeId, setActiveId] = useState<number | null>(null);

    const items = serviceList?.list ?? [];

    const filtered = useMemo(() => {
        if (!activeId) return items;
        return items.filter((x) => x.id === activeId);
    }, [activeId, items]);

    if (!serviceList) return null;

    return (
        <section id={id} className={clsx("w-full py-20", className)}>
            <div className="container">

                {/* Title */}
                <p className="text-md text-dark/60 max-w-2xl">
                    {serviceList.title}
                </p>

                {/* Pills (using the titles in serviceList) */}
                <div className="mt-8 flex flex-wrap gap-4">
                    {items.map((s) => {
                        const isActive = activeId === s.id;

                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveId(isActive ? null : s.id)}
                                className={clsx(
                                    "rounded-full border px-4 py-2 text-sm sm:text-lg transition",
                                    isActive
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                )}
                            >
                                {s.title}
                            </button>
                        );
                    })}
                </div>

                {/* mosaic grid */}
                <div
                    className={clsx(
                        "mt-20 grid grid-cols-1 gap-6",
                        // ✅ mosaic only from sm+
                        "sm:grid-cols-2 sm:grid-flow-dense sm:auto-rows-[58px]"
                    )}
                >
                    {filtered.map((s, idx) => {
                        const spanClass =
                            SPAN_CLASSES[idx % SPAN_CLASSES.length] ?? "sm:row-span-6";

                        return (
                            <div
                                key={s.id}
                                className={clsx(
                                    // ✅ mobile: normal fixed card height, no row spans applied anyway
                                    "aspect-[16/10] sm:aspect-auto sm:h-auto",
                                    spanClass
                                )}
                            >
                                <ServiceCard title={s.title} img={s.img} href={s.href} />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

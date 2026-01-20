"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { Eye, Target } from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
    Eye,
    Target,
};

export const OurMission = () => {
    const { text } = useSiteMode();

    return (
        <section className="bg-white py-20 sm:py-24 lg:py-32">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Grid */}
                <div
                    className="
                        grid gap-12
                        grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
                    "
                >
                    {text.AboutUs.ourMission.map((mission) => {
                        const Icon = ICONS[mission.icon] ?? Eye;

                        return (
                            <div
                                key={mission.id}
                                className="
                                    group flex flex-col items-center text-center
                                    rounded-2xl bg-white
                                    px-6 py-10 transition-all
                                "
                            >
                                {/* Icon */}
                                <div
                                    className="
                                        mb-8 flex h-24 w-24 items-center justify-center
                                        rounded-2xl bg-gray-50 border border-gray-200
                                        transition-colors duration-300
                                        group-hover:bg-gray-900 group-hover:border-gray-900
                                    "
                                >
                                    <Icon
                                        size={34}
                                        className="
                                            text-dark
                                            transition-colors duration-300
                                            group-hover:text-white
                                        "
                                    />
                                </div>

                                {/* Title*/}
                                <h3
                                    className="
                                        text-lg sm:text-xl font-semibold text-dark
                                        line-clamp-2 min-h-[3rem]
                                    "
                                >
                                    {mission.title}
                                </h3>

                                {/* Body */}
                                <p
                                    className="
                                        mt-4 text-sm sm:text-base text-dark/70
                                        leading-relaxed
                                        line-clamp54
                                    "
                                >
                                    {mission.body}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

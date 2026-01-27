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
        <section className="bg-white">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Grid */}
                <div
                    className="
                        grid fluid-gap
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
                                        mb-stack-md flex h-40 w-40 rounded-3xl bg-gray-900/5 items-center justify-center
                                    "
                                >
                                    <Icon
                                        size={64}
                                        className="
                                            text-dark
                                        "
                                    />
                                </div>

                                {/* Title*/}
                                <h3
                                    className="
                                        text-h4 font-bold text-dark
                                        line-clamp-2 min-h-[3rem]
                                    "
                                >
                                    {mission.title}
                                </h3>

                                {/* Body */}
                                <p
                                    className="
                                        mt-stack-sm px-10 text-body text-dark/70
                                        leading-relaxed
                                        line-clamp-4
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

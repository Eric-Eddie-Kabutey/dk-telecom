"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";

export const HowWeStandOut = () => {
    const { text } = useSiteMode();

    const icons = [
        "/assets/resources/exceptional-customer-service-icon.svg",
        "/assets/resources/flexible-plans-for-ever-need-icon.svg",
        "/assets/resources/reliable-high-speed-connectivity-icon.svg"
    ];

    const stats = [
        "/assets/resources/17x-faster-than-the-national-average.png",
        "/assets/resources/guaranteed-high-speeds-day-&-night.png",
        "/assets/resources/service-wth-network-uptime.png"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{text.howWeStandOut.title}</h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    {text.howWeStandOut.features.map((feature, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="bg-blue-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:bg-blue-600 group-hover:rotate-12">
                                <Image
                                    src={icons[idx]}
                                    alt={feature.title}
                                    width={48}
                                    height={48}
                                    className="group-hover:invert transition-all"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                            <Image src={stat} alt="Stat" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-12 text-xs text-gray-300">
                Visual Reference: how-we-stand-out.png
            </div>
        </section>
    );
};

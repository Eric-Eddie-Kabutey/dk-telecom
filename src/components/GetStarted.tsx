"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";
import { CheckCircle, Wifi, Users } from "lucide-react";

export const GetStarted = () => {
    const { text } = useSiteMode();

    return (
        <section className="py-24 bg-white">
                {/* width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem; */}
            <div className="w-[80%] max-w-[1280px] mx-auto px-[3rem]">
                <div className="text-center mb-32">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{text.getStarted.title}</h2>
                    {/* <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-24 xl:gap-40 mb-24">
                    {text.getStarted.steps.map((step, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="h-32 w-32 rounded-2xl bg-gray-900/5 border border-gray-900/10 flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:bg-gray-900 group-hover:border-gray-900">
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    width={48}
                                    height={48}
                                    className="group-hover:invert transition-all"
                                />
                            </div>
                            <div className="mt-6 ">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900  px-[2rem]">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

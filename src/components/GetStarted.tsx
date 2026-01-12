"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { CheckCircle, Wifi, Users } from "lucide-react";

export const GetStarted = () => {
    const { text } = useSiteMode();

    const steps = [
        { title: text.getStarted.step1.title, desc: text.getStarted.step1.desc, icon: <Wifi className="w-8 h-8 text-blue-600" /> },
        { title: text.getStarted.step2.title, desc: text.getStarted.step2.desc, icon: <Users className="w-8 h-8 text-blue-600" /> },
        { title: text.getStarted.step3.title, desc: text.getStarted.step3.desc, icon: <CheckCircle className="w-8 h-8 text-blue-600" /> },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{text.getStarted.title}</h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-8 border border-gray-100">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-300">
                Visual Reference: get-started.png
            </div>
        </section>
    );
};

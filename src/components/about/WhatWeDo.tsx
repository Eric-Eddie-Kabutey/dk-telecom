"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { motion } from "framer-motion";

export const WhatWeDo = () => {
    const { text } = useSiteMode();

    return (
        <section className="bg-white py-16 sm:py-20 lg:py-28">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto max-w-4xl px-6"
            >
                {/* Title */}
                <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark">
                    {text.AboutUs.whatWeDo.title}
                </h2>

                {/* Subtitle */}
                <p className="mt-4 text-left text-lg sm:text-xl font-light text-dark">
                    {text.AboutUs.whatWeDo.subtitle}
                </p>

                {/* Divider */}
                <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-primary" />

                {/* Body */}
                <p className="mt-10 text-base sm:text-lg leading-relaxed text-dark/70 text-left">
                    {text.AboutUs.whatWeDo.body}
                </p>
            </motion.div>
        </section>
    );
};


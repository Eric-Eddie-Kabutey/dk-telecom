"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { FastInternetFamily } from "./FastInternetFamily";
import { FastInternetStreaming } from "./FastInternetStreaming";

interface FastInternetProps {
    variant?: "family" | "streaming";
}

export const FastInternet = ({ variant = "family" }: FastInternetProps) => {
    const { text } = useSiteMode();

    const content =
        variant === "family" ? text.fastInternet.family : text.fastInternet.streaming;

    const imagePath =
        variant === "family"
            ? "/assets/resources/image2.png"
            : "/assets/resources/fast-internet-built-for-everyday-smooth-streaming-img.png";

    return (
        <section className=" bg-white py-20">
            {variant === "family" ? (
                <FastInternetFamily content={content} imagePath={imagePath} />
            ) : (
                <FastInternetStreaming content={content} imagePath={imagePath} />
            )}
        </section>
    );
};

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
                duration: 1.2,
                ease: [0.77, 0, 0.175, 1]
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
        >
            <div className="relative">
                {/* Static Logo animation (one-time fade in) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="shrink-0"
                >
                    <Image
                        src="/assets/resources/logo.svg"
                        alt="DK Telecom"
                        width={300}
                        height={60}
                        className="h-auto w-[250px] sm:w-[300px]"
                        priority
                    />
                </motion.div>

                <motion.div
                    className="absolute -bottom-10 left-0 h-1 bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;

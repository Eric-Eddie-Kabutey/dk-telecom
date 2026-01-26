"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

export const InitialLoader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldShowLoader, setShouldShowLoader] = useState(true);

    useEffect(() => {
        const hasSeenLoader = localStorage.getItem("dk_telecom_loader_seen");

        if (hasSeenLoader) {
            setIsLoading(false);
            setShouldShowLoader(false);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setShouldShowLoader(false);
                localStorage.setItem("dk_telecom_loader_seen", "true");
            }, 2800);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && shouldShowLoader && <LoadingScreen key="loader" />}
            </AnimatePresence>
            <MotionDivWrapper isLoading={isLoading && shouldShowLoader}>
                {children}
            </MotionDivWrapper>
        </>
    );
};

// Helper to prevent flash of content or handle visibility if needed
const MotionDivWrapper = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
    return (
        <div className={isLoading ? "opacity-0 invisible" : "opacity-100 visible transition-opacity duration-1000"}>
            {children}
        </div>
    );
};

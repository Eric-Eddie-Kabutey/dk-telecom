"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import residentialText from "../content/residential.json";
import businessText from "../content/business.json";

type Mode = "residential" | "business";

interface SiteModeContextType {
    mode: Mode;
    toggleMode: () => void;
    text: typeof residentialText;
}

const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);

export const SiteModeProvider: React.FC<{ children: React.ReactNode; initialMode: Mode }> = ({
    children,
    initialMode
}) => {
    const [mode, setMode] = useState<Mode>(initialMode);
    const router = useRouter();
    const pathname = usePathname();

    // Sync mode with URL and localStorage
    useEffect(() => {
        // Redirection for root path based on saved preference
        if (pathname === "/" || pathname === "") {
            const savedMode = localStorage.getItem("dk-telecom-mode") as Mode;
            const targetMode = (savedMode === "residential" || savedMode === "business") ? savedMode : "residential";
            if (targetMode !== mode) {
                setMode(targetMode);
            }
            router.push(`/${targetMode}`);
            return;
        }

        // Detect mode from current URL segments
        const pathSegments = pathname.split("/").filter(Boolean);
        const modeSegment = pathSegments[0] as Mode;

        if (modeSegment === "residential" || modeSegment === "business") {
            if (mode !== modeSegment) {
                setMode(modeSegment);
            }
            localStorage.setItem("dk-telecom-mode", modeSegment);
        }
    }, [pathname, router, mode]);

    const toggleMode = () => {
        const newMode = mode === "residential" ? "business" : "residential";
        setMode(newMode);
        localStorage.setItem("dk-telecom-mode", newMode);

        // Sync route
        if (pathname.includes(`/${mode}`)) {
            const newPath = pathname.replace(`/${mode}`, `/${newMode}`);
            router.push(newPath);
        } else if (pathname === "/") {
            router.push(`/${newMode}`);
        }
    };

    const text = mode === "residential" ? residentialText : businessText;

    return (
        <SiteModeContext.Provider value={{ mode, toggleMode, text }}>
            {children}
        </SiteModeContext.Provider>
    );
};

export const useSiteMode = () => {
    const context = useContext(SiteModeContext);
    if (!context) {
        throw new Error("useSiteMode must be used within a SiteModeProvider");
    }
    return context;
};

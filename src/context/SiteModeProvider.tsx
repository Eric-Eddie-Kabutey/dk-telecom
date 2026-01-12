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

export const SiteModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<Mode>("residential");
    const router = useRouter();
    const pathname = usePathname();

    // Rehydrate from localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem("dk-telecom-mode") as Mode;
        if (savedMode && (savedMode === "residential" || savedMode === "business")) {
            setMode(savedMode);

            // Ensure the URL matches the saved mode if we are at root
            if (pathname === "/") {
                router.push(`/${savedMode}`);
            }
        } else {
            // Default redirect
            if (pathname === "/") {
                router.push("/residential");
            }
        }
    }, [pathname, router]);

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

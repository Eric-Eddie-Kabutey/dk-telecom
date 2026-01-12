"use client";

import React from "react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { clsx } from "clsx";

export const AboveNavBar = () => {
    const { mode, toggleMode, text } = useSiteMode();

    return (
        <div></div>
        // <div className="w-full bg-gray-900 text-white py-2 px-4 flex justify-between items-center text-sm">
        //     <div className="flex items-center space-x-4">
        //         <span className="opacity-80">{text.aboveNavBar.message}</span>
        //     </div>
        //     <div className="flex items-center space-x-3">
        //         <div className="flex border border-gray-700 rounded-full p-0.5 bg-gray-800">
        //             <button
        //                 onClick={() => mode === "business" && toggleMode()}
        //                 className={clsx(
        //                     "px-4 py-1 rounded-full transition-all duration-300",
        //                     mode === "residential" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
        //                 )}
        //             >
        //                 Residential
        //             </button>
        //             <button
        //                 onClick={() => mode === "residential" && toggleMode()}
        //                 className={clsx(
        //                     "px-4 py-1 rounded-full transition-all duration-300",
        //                     mode === "business" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
        //                 )}
        //             >
        //                 Business
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
};

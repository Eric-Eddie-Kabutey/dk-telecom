"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteMode } from "@/context/SiteModeProvider";
import { clsx } from "clsx";

export const NavBar = () => {
    const { mode, toggleMode, text } = useSiteMode();
    const pathname = usePathname();

    const navItems = [
        // { label: text.nav.explore, href: `/${mode}/explore` },
        { label: text.nav.about, href: `/${mode}/about` },
        { label: text.nav.services, href: `/${mode}/our-services` },
        { label: text.nav.blog, href: `/${mode}/blog` },
        { label: text.nav.contact, href: `/${mode}/contact` },
        { label: text.nav.support, href: `/${mode}/support` },
    ];

    const isActive = (href: string) => {
        if (href === `/${mode}` && pathname === `/${mode}`) return true;
        if (href !== `/${mode}` && pathname?.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent pb-8 pointer-events-none">
            <div className=" px-4 md:px-6 pointer-events-auto">
                {/* Top Bar / Toggles */}
                <div className="w-full text-white flex justify-between items-center text-sm py-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center gap-4">
                            {/* Residential */}
                            <button
                                type="button"
                                onClick={() => mode === "business" && toggleMode()}
                                className={clsx(
                                    "group flex flex-row gap-2 justify-center items-center rounded-full cursor-pointer select-none",
                                    "transition-all duration-300 hover:opacity-90",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "bg-white rounded-full transition-all duration-300",
                                        mode === "residential" ? "p-0.5" : "p-0"
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "uppercase transition-all duration-300 text-sm",
                                        mode === "residential" ? "font-bold" : "font-light"
                                    )}
                                >
                                    Residential
                                </span>
                            </button>

                            {/* Business */}
                            <button
                                type="button"
                                onClick={() => mode === "residential" && toggleMode()}
                                className={clsx(
                                    "group flex flex-row gap-2 justify-center items-center rounded-full cursor-pointer select-none",
                                    "transition-all duration-300 hover:opacity-90",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "bg-white rounded-full transition-all duration-300",
                                        mode === "business" ? "p-0.5" : "p-0"
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "uppercase transition-all duration-300 text-sm",
                                        mode === "business" ? "font-bold" : "font-light"
                                    )}
                                >
                                    Business
                                </span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex justify-between items-center px-8 md:px-16 rounded-md bg-primary">
                    <Link href={`/${mode}`} className="flex items-center space-x-2 relative z-10">
                        <Image src="/assets/resources/logo.svg" alt="DK Telecom" width={120} height={40} className="w-28 md:w-32" />
                    </Link>

                    <div className="hidden md:flex flex-row justify-center items-center space-x-8">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <div key={item.href} className="relative flex flex-col justify-between">
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            "py-6 text-sm font-medium transition-all duration-200 relative",
                                            active ? "text-white" : "text-white/70 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                    {active && (
                                        <span className="absolute left-0 bottom-0 w-full h-[3px] bg-white rounded-full animate-fadeIn" />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="hidden md:flex items-center space-x-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
                        >
                            <span>Branch Locator</span>
                        </Link>

                        <button className="md:hidden text-white p-2">
                            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-current"></div>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

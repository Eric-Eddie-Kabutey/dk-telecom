"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteMode } from "@/context/SiteModeProvider";
import { clsx } from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";

export const NavBar = () => {
    const { mode, toggleMode, text } = useSiteMode();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const navItems = [
        { label: text.nav.about, href: `/${mode}/about` },
        { label: text.nav.services, href: `/${mode}/our-services` },
        { label: text.nav.blog, href: `/${mode}/blog` },
        { label: text.nav.contact, href: `/${mode}/contact` },
        { label: text.nav.support, href: `/${mode}/support` },
        { label: text.nav.career, href: `/${mode}/career` },
        { label: text.nav.packages, href: `/${mode}/packages` },
    ];

    const isActive = (href: string) => {
        if (href === `/${mode}` && pathname === `/${mode}`) return true;
        if (href !== `/${mode}` && pathname?.startsWith(href)) return true;
        return false;
    };

    const toggleMenu = () => setMenuOpen((v) => !v);
    const closeMenu = () => setMenuOpen(false);

    // close menu when navigating
    React.useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const menuVariants: Variants = {
        hidden: { opacity: 0, height: 0, y: -10, filter: "blur(8px)" },
        show: {
            opacity: 1,
            height: "auto",
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.35, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
        },
        exit: { opacity: 0, height: 0, y: -10, filter: "blur(8px)", transition: { duration: 0.25, ease: "easeIn" } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
    };

    return (
        <div className="fixed flex justify-center content-center align-center top-0 left-0 w-[100vw] z-50 bg-gradient-to-b from-black/80 to-transparent pb-28 pointer-events-none">
            <div className="max-w-[1800px] w-full px-4 md:px-6 pointer-events-auto">
                {/* Top Bar / Toggles */}
                <div className="w-full text-white flex justify-between items-center text-sm py-2">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center gap-4">
                            {/* Residential */}
                            <button
                                type="button"
                                onClick={() => mode === "business" && toggleMode()}
                                className={clsx(
                                    "group flex flex-row gap-2 justify-center items-center rounded-full cursor-pointer select-none",
                                    "transition-all duration-300 hover:opacity-90"
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
                                        "uppercase transition-all duration-300 text-md",
                                        mode === "residential" ? "font-medium" : "font-extralight"
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
                                    "transition-all duration-300 hover:opacity-90"
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
                                        "uppercase transition-all duration-300 text-md",
                                        mode === "business" ? "font-medium" : "font-extralight"
                                    )}
                                >
                                    Business
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex justify-between items-center px-4 md:px-6 lg:px-16 py-2 md:py-0 rounded-md bg-primary">
                    <Link href={`/${mode}`} className="flex items-center space-x-2 relative z-10">
                        <Image
                            src="/assets/resources/logo.svg"
                            alt="DK Telecom"
                            width={120}
                            height={40}
                            className="w-20 lg:w-26"
                        />
                    </Link>

                    <div className="hidden md:flex flex-row justify-center items-center gap-2 md:gap-4 lg:gap-10">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <div key={item.href} className="relative flex flex-col justify-between">
                                    <Link
                                        href={item.href}
                                        className={clsx("py-6 text-xs md:text-sm text-white hover:text-white/60 font-light transition-all duration-200 relative")}
                                    >
                                        {item.label}
                                    </Link>
                                    {active && (
                                        <span className="absolute left-0 bottom-0 w-full h-[3px] bg-white rounded-full animate-fadeIn" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/${mode}/branches`}
                            className="hidden md:flex items-center space-x-2 text-xs md:text-sm font-bold text-white transition-colors"
                        >
                            <span>Branch Locator</span>
                        </Link>

                        {/* Burger / X Button */}
                        <button
                            type="button"
                            onClick={toggleMenu}
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            className="md:hidden cursor-pointer text-white p-2 relative w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {/* line 1 */}
                            <span
                                className={clsx(
                                    "absolute left-2 right-2 h-0.5 bg-current rounded-full transition-all duration-300",
                                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3"
                                )}
                            />
                            {/* line 2 */}
                            <span
                                className={clsx(
                                    "absolute left-2 right-2 h-0.5 bg-current rounded-full transition-all duration-300",
                                    menuOpen ? "top-1/2 -translate-y-1/2 opacity-0 scale-x-75" : "top-1/2 -translate-y-1/2 opacity-100"
                                )}
                            />
                            {/* line 3 */}
                            <span
                                className={clsx(
                                    "absolute left-2 right-2 h-0.5 bg-current rounded-full transition-all duration-300",
                                    menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-3"
                                )}
                            />
                        </button>
                    </div>
                </nav>

                {/* Animated Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            variants={menuVariants}
                            className="md:hidden mt-2 rounded-md overflow-hidden relative"
                        >
                            {/* overlay */}
                            <div className="absolute inset-0 bg-white backdrop-blur-md" />
                            {/* <motion.div
                                aria-hidden="true"
                                className="absolute inset-0 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    className="absolute -top-10 left-0 right-0 h-24 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                                    animate={{ x: ["-120%", "120%"] }}
                                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.8)_1px,transparent_1px)] [background-size:100%_10px]" />
                            </motion.div> */}

                            <div className="relative p-4 flex flex-col items-center gap-2">
                                {navItems.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <motion.div key={item.href} variants={itemVariants} className="w-full">
                                            <Link
                                                href={item.href}
                                                onClick={closeMenu}
                                                className={clsx(
                                                    "block w-full text-center py-3 text-md font-light rounded-md transition-all",
                                                    active ? "bg-dark/10 text-black" : "text-black hover:bg-black/5"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                <motion.div variants={itemVariants} className="w-full">
                                    <Link
                                        href={`/${mode}/branches`}
                                        onClick={closeMenu}
                                        className="block w-full text-center py-3 text-md font-bold rounded-md transition-all text-black hover:bg-black/5"
                                    >
                                        Branch Locator
                                    </Link>
                                </motion.div>

                                {/* tiny signal dots */}
                                <motion.div
                                    variants={itemVariants}
                                    className="mt-2 flex items-center gap-2 opacity-60"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse [animation-delay:120ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse [animation-delay:240ms]" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

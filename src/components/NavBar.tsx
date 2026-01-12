"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";
import { PhoneCall } from "lucide-react";

export const NavBar = () => {
    const { mode, text } = useSiteMode();
    const navItems = [
        { label: text.nav.explore, href: `/${mode}/explore` },
        { label: text.nav.about, href: `/${mode}/about` },
        { label: text.nav.services, href: `/${mode}/our-services` },
        { label: text.nav.blog, href: `/${mode}/blog` },
        { label: text.nav.contact, href: `/${mode}/contact` },
        { label: text.nav.support, href: `/${mode}/support` },
    ];

    return (
        <nav className="sticky top-0 z-50 glass w-full shadow-sm">
            <div className="container flex justify-between items-center py-4">
                <Link href={`/${mode}`} className="flex items-center space-x-2">
                    <Image src="/assets/resources/logo.svg" alt="DK Telecom" width={120} height={40} />
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        href="https://wa.me/1234567890"
                        target="_blank"
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                    >
                        <Image src="/assets/resources/whatsapp-icon.svg" alt="WhatsApp" width={20} height={20} />
                        <span className="hidden sm:inline">WhatsApp</span>
                    </Link>
                    <button className="md:hidden">
                        {/* Mobile menu icon */}
                        <div className="w-6 h-0.5 bg-gray-900 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-900 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-900"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
};

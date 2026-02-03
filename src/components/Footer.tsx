"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";
import { MessageSquare, AppWindow, type LucideIcon } from "lucide-react";

type FooterLink1 = {
    label: string;
    icon: keyof typeof ICONS;
    href?: string;
};

type FooterLink2 = {
    label: string;
    href?: string;
};

const ICONS = {
    MessageSquare,
    AppWindow,
} satisfies Record<string, LucideIcon>;

export const Footer = () => {
    const { text } = useSiteMode();

    const links1 = (text.footer.links1 ?? []) as FooterLink1[];
    const links2Raw = text.footer.links2 ?? [];

    // Support BOTH formats for links2: strings OR {label, href}
    const links2: FooterLink2[] = links2Raw.map((x: any) =>
        typeof x === "string" ? { label: x, href: "#" } : x
    );

    return (
        <footer className="bg-dark py-20">
            <div className="container flex flex-col md:flex-row-reverse md:items-start items-center justify-between">
                {/* Logo */}
                <div className="w-full md:w-[50%] flex flex-row items-end justify-start md:justify-end shrink-0 mb-10">
                    <Image
                        src="/assets/resources/logo.svg"
                        alt="DK Telecom"
                        width={110}
                        height={45}
                        className="w-[195px]"
                    />
                </div>
                <div className="w-full md:w-[50%]">
                    {/* links1 */}
                    <div className="mb-10 flex flex-row flex-wrap gap-4 justify-start md:justify-start sm:items-center sm:gap-x-8 sm:gap-y-3">
                        {links1.map((item) => {
                            const Icon = ICONS[item.icon] ?? MessageSquare;
                            const content = (
                                <div className="flex items-center gap-3">
                                    <Icon className="text-primary-dark" size={22} />
                                    <span className="text-body font-normal capitalize text-white">
                                        {item.label}
                                    </span>
                                </div>
                            );

                            return item.href ? (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-xl"
                                >
                                    {content}
                                </Link>
                            ) : (
                                <div
                                    key={item.label}
                                    className="rounded-xl"
                                >
                                    {content}
                                </div>
                            );
                        })}
                    </div>

                    {/* links2 */}
                    <div className="mb-10 flex flex-row flex-wrap gap-4 justify-start md:justify-start sm:items-center sm:gap-x-8 sm:gap-y-3">
                        {links2.map((link) =>
                            link.href ? (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-small font-light text-white/80 transition hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <span
                                    key={link.label}
                                    className="text-sm font-light text-white/80"
                                >
                                    {link.label}
                                </span>
                            )
                        )}
                    </div>

                    {/* copy */}
                    <p className="text-caption text-left font-light text-white/70">
                        {text.footer.copy}
                    </p>
                </div>
            </div>
        </footer>
    );
};

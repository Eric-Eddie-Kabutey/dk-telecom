"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import HeroCarousel, { CarouselHandle } from "@/components/home/HeroCarousel";

type PackageItem = {
    id: number;
    type: string;
    bandwidth: string;
    for: string;
    tags: string[];
    prices: { id: number; title: string; price: string }[];
    popular?: boolean;
};

export const HeroMain = () => {
    const { text, mode } = useSiteMode();

    const packageList: PackageItem[] =
        text?.packages?.packageSection?.packageList ?? [];

    const carouselRef = React.useRef<CarouselHandle | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    // fallback if package list empty
    const hasPackages = packageList.length > 0;

    return (
        <section className="relative w-full h-full min-h-screen overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={text.hero.heroImg}
                    alt={text.hero.title}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
            </div>

            <div className="container h-full min-h-screen flex flex-col justify-between items-center">
                <div className="w-full relative z-10 items-center mt-[140px] md:mt-[200px]">
                    <HeroCarousel
                        ref={carouselRef}
                        autoPlay
                        intervalMs={6000}
                        pauseOnHover
                        showIndicators={false}
                        onIndexChange={(i) => setActiveIndex(i)}
                        className="w-full"
                        slideClassName="px-0"
                    >
                        {packageList.map((pkg) => {
                            const monthly =
                                pkg.prices?.find((p) =>
                                    (p.title || "").toLowerCase().includes("monthly")
                                )?.price ?? "D --";

                            return (
                                <div
                                    key={pkg.id}
                                    className="w-full lg:w-[70%] text-white space-y-8 animate-in fade-in slide-in-from-left duration-700"
                                >
                                    {/* <h1 className="text-5xl md:text-xl font-bold leading-tight drop-shadow-md capitalize">
                                    {pkg.type}
                                </h1>

                                <h2 className="text-4xl lg:text-4xl xl:text-6xl text-white/90 drop-shadow-sm">
                                    {pkg.bandwidth} mbps{" "}
                                    <span className="text-white/80 font-light">{pkg.for}</span>
                                </h2> */}
                                    <div className="w-full text-white stack-lg animate-in fade-in slide-in-from-left duration-1000">
                                        <h1 className="text-h6  !text-white !mb-0">
                                            {text.hero.title}
                                        </h1>
                                        <h2 className="text-h2 md:text-h1 text-extrabold capitalize drop-shadow-sm">
                                            {text.hero.subtitle}
                                        </h2>
                                    </div>

                                    <h3 className="text-hero-subtitle font-black capitalize drop-shadow-sm">
                                        {pkg.bandwidth} mbps{" "}
                                        <span className="text-white font-extralight">{pkg.for}</span>
                                    </h3>
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        {(pkg.tags ?? []).slice(0, 4).map((tag, i) => (
                                            <div
                                                key={`${pkg.id}-tag-${i}`}
                                                className={clsx(
                                                    "flex items-center gap-2.5",
                                                    "rounded-xl px-3 py-2.5",
                                                    "bg-white/10 border border-white/10 backdrop-blur-md"
                                                )}
                                            >
                                                <span className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/10">
                                                    <Check className="h-3.5 lg:h-6.5 w-3.5 lg:w-6.5 m-[2px] lg:m-[6px] text-white" />
                                                </span>
                                                <span className="text-white/90 text-sm lg:text-lg font-light leading-snug capitalize">
                                                    {tag}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-h2 font-extrabold">{monthly}</span>
                                        <span className="text-h5 font-light opacity-80">/ month</span>
                                    </div>
                                </div>
                            );
                        })}
                    </HeroCarousel>
                </div>

                {/* Bottom bar */}
                <div className="w-full my-10 md:my-20 z-10 animate-in fade-in zoom-in duration-1000 delay-200">
                    <div className="relative w-full flex flex-row justify-between items-center px-6 sm:px-10 md:px-20 py-4 bg-white/20 backdrop-blur-xs rounded-3xl">
                        {/* Custom Indicators */}
                        <div className="flex flex-row justify-center items-center gap-2.5">
                            {packageList.map((_, i) => {
                                const active = i === activeIndex;
                                return (
                                    <button
                                        key={`pkg-ind-${i}`}
                                        type="button"
                                        onClick={() => carouselRef.current?.goTo(i)}
                                        className={clsx(
                                            "rounded-full transition-all duration-300",
                                            active ? "md:w-7 md:h-7 w-3 h-3 bg-dark" : "md:w-5 md:h-5 w-2 h-2 bg-black/20 hover:bg-black/30"
                                        )}
                                        aria-label={`Go to package ${i + 1}`}
                                        aria-current={active ? "true" : "false"}
                                    />
                                );
                            })}
                        </div>

                        <button className="bg-transparent border px-6 sm:px-10 py-2 md:py-4 rounded-full uppercase text-white transition-all hover:scale-105 shadow-xl text-[12px] md:text-button truncate">
                            <Link href={`/${mode}/packages`}>
                                {text.hero.ctaPrimary}
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};



{/* <div className="absolute -top-10 -right-10">
                        <Link
                            href="https://wa.me/1234567890"
                            target="_blank"
                            className="flex items-center space-x-2 bg-[#00D539] text-white px-6 py-6 rounded-full hover:bg-green-600 transition-colors"
                        >
                            <Image
                                src="/assets/resources/whatsapp-icon.svg"
                                alt="WhatsApp"
                                width={50}
                                height={60}
                            />
                        </Link>
                    </div> */}
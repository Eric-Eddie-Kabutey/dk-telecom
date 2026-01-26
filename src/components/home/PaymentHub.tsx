"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";
import clsx from "clsx";

export const PaymentHub = () => {
    const { text } = useSiteMode();

    return (
        <section className="relative overflow-hidden text-white py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        "relative bg-darkPrimary shadow-2xl overflow-hidden",
                        "rounded-[28px] sm:rounded-[36px] lg:rounded-[60px]"
                    )}
                >

                    <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 min-h-[640px] sm:min-h-[720px] lg:min-h-[420px]">
                        {/* Text */}
                        <div className="lg:col-span-6 px-7 sm:px-10 lg:px-14 pt-10 sm:pt-14 lg:py-16 space-y-5 sm:space-y-7 text-left">
                            <p className="uppercase text-[11px] sm:text-xs tracking-[0.22em] text-white/70 font-semibold">
                                {text.paymentHub.tagline}
                            </p>

                            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
                                {text.paymentHub.title}
                            </h2>

                            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                                {text.paymentHub.desc}
                            </p>

                            <div className="pt-3 sm:pt-4">
                                <button
                                    className={clsx(
                                        "inline-flex items-center justify-center",
                                        "uppercase tracking-widest text-xs",
                                        "text-white border border-white/60",
                                        "rounded-full px-7 md:px-9 py-3 md:py-3.5",
                                        "transition-all duration-300",
                                        "hover:border-white hover:bg-white/10 hover:scale-[1.03]",
                                        "active:scale-[0.99]",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-darkPrimary"
                                    )}
                                >
                                    Download
                                </button>
                            </div>
                        </div>


                        <div className="lg:col-span-6 mt-auto lg:mt-0 px-4 sm:px-10 lg:px-14 pb-0">
                            <div className="flex justify-center lg:justify-end items-end">
                                <div
                                    className={clsx(
                                        "relative w-full",
                                        "max-w-[420px] sm:max-w-[480px] lg:max-w-none lg:w-full",
                                        "aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/12]",
                                        "translate-y-10 sm:translate-y-14 lg:translate-y-0"
                                    )}
                                >
                                    <Image
                                        src="/assets/resources/get-your-all-in-one-wallet-&-payment-hub-img.png"
                                        alt="Payment Hub"
                                        fill
                                        priority
                                        className="object-contain drop-shadow-2xl"
                                        sizes="(max-width: 1024px) 90vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
                </div>
            </div>
        </section>
    );
};

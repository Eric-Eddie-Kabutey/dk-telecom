"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";

export const PaymentHub = () => {
    const { text } = useSiteMode();

    return (
        <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50"></div>

            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1.5 bg-blue-500/30 backdrop-blur-md rounded-full text-sm font-bold border border-blue-400/30">
                        WALLET & PAYMENTS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        {text.paymentHub.title}
                    </h2>
                    <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                        {text.paymentHub.desc}
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                            Open Wallet
                        </button>
                    </div>
                </div>

                <div className="relative h-[450px] animate-in slide-in-from-right duration-1000">
                    <Image
                        src="/assets/resources/get-your-all-in-one-wallet-&-payment-hub-img.png"
                        alt="Payment Hub"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
            <div className="text-center mt-12 text-xs text-blue-400">
                Visual Reference: payment-hub.png
            </div>
        </section>
    );
};

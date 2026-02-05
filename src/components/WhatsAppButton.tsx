"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_PHONE_NUMBER } from "@/constants/contact";

const WhatsAppButton = () => {
    return (
        <div className="fixed bottom-10 right-10 z-50">
            <Link
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#00D539] text-white p-6 rounded-full hover:bg-green-600 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 group"
            >
                <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                    <Image
                        src="/assets/resources/whatsapp-icon.svg"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
            {/* Subtle pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#00D539] opacity-20 animate-ping -z-10" />
        </div>
    );
};

export default WhatsAppButton;

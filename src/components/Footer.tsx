"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";

export const Footer = () => {
    const { text } = useSiteMode();

    return (
        <footer className="bg-gray-100 py-12 px-4 border-t border-gray-200">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Image src="/assets/resources/logo.svg" alt="DK Telecom" width={140} height={45} className="mb-4" />
                    <p className="text-gray-600 max-w-sm mb-4">
                        Connect to the fastest network in the nation. Providing reliable connectivity for homes and businesses.
                    </p>
                    <p className="text-gray-800 font-medium">{text.footer.copy}</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-600">
                        {text.footer.links.map(link => (
                            <li key={link}><Link href="#" className="hover:text-blue-600 transition-colors">{link}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li>123 Telecom Plaza, City</li>
                        <li>info@dktelecom.com</li>
                        <li>+1 (234) 567-890</li>
                    </ul>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                Visual Reference: footer.png
            </div>
        </footer>
    );
};

"use client";

import React from "react";
import { Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Branch } from "./types";
import clsx from "clsx";
import ViewBranch from "./ViewBranch";
import { motion, AnimatePresence } from "framer-motion";

type BranchCardProps = {
    branch: Branch;
    isExpanded: boolean;
    onToggle: () => void;
};

const BranchCard = ({ branch, isExpanded, onToggle }: BranchCardProps) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <div className="group py-8 md:py-10">
                {/* Main Header Row */}
                <div className="grid grid-cols-4 gap-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 col-span-3">
                        {/* Left Column: Title & Description */}
                        <div className="flex-1 space-y-2">
                            <h3 className="text-3xl md:text-3xl font-bold text-gray-900 capitalize">
                                {branch.town}
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
                                {branch.description}
                            </p>
                        </div>

                        {/* Middle Column: Contact Info */}
                        <div className="w-full md:w-1/3 space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="w-5 h-5 text-gray-900" fill="currentColor" />
                                <span className="text-base font-medium">{branch.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <MapPin className="w-5 h-5 text-gray-900" fill="currentColor" />
                                <span className="text-base font-medium capitalize">{branch.town}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Toggle Button */}
                    <div className="flex items-center justify-end col-span-1">
                        <button
                            onClick={onToggle}
                            className={clsx(
                                "p-3 rounded-xl transition-all duration-300",
                                isExpanded ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100"
                            )}
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? (
                                <ChevronUp className="w-6 h-6 text-gray-900" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Expanded Content Area */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Side: Details */}
                                <div className="space-y-10">
                                    {/* Open Hours */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Open hours</h4>
                                        <p className="text-gray-600 font-light">{branch.openingHours}</p>
                                    </div>

                                    {/* Services */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-4">Services</h4>
                                        <ul className="space-y-2">
                                            {branch.services.map((service, index) => (
                                                <li
                                                    key={index}
                                                    className="text-gray-600 font-light capitalize flex items-start gap-2"
                                                >
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Address</h4>
                                        <p className="text-gray-600 font-light max-w-xs">{branch.address}</p>
                                    </div>
                                </div>

                                {/* Right Side: Map */}
                                <div className="h-full min-h-[350px] z-10">
                                    <ViewBranch
                                        lat={branch.location.lat}
                                        lng={branch.location.lng}
                                        name={branch.name}
                                        address={branch.address}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BranchCard;

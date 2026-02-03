"use client";

import React, { useState, useMemo } from "react";
import { Search, MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { Branch } from "./types";
import dynamic from "next/dynamic";
import clsx from "clsx";

// Dynamically import LeafletMap to avoid SSR issues
const LeafletMap = dynamic(
    () => import("./leaflet/LeafletMap"),
    { ssr: false, loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div> }
);

type BranchLocatorProps = {
    branches: Branch[];
};

const BranchLocator = ({ branches }: BranchLocatorProps) => {
    // Filter states
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);

    // Filter branches
    const filteredBranches = useMemo(() => {
        return branches.filter((branch) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                searchQuery === "" ||
                branch.name.toLowerCase().includes(searchLower) ||
                branch.description.toLowerCase().includes(searchLower) ||
                branch.address.toLowerCase().includes(searchLower) ||
                branch.town.toLowerCase().includes(searchLower) ||
                branch.region.toLowerCase().includes(searchLower) ||
                branch.services.some(s => s.toLowerCase().includes(searchLower))
            );
        });
    }, [branches, searchQuery]);

    const handleBranchClick = (id: number) => {
        setSelectedBranchId(id);
        // Scroll to map on mobile if needed, or just focus
    };

    return (
        <section className="bg-gray-50/50  py-12 md:py-20 relative">
            <div className="">
                <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[800px] bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">

                    {/* LEFT PANEL: LIST & SEARCH */}
                    <div className="w-full lg:w-[450px] flex flex-col border-r border-gray-100 h-1/2 lg:h-full">

                        {/* Header & Search */}
                        <div className="p-6 border-b border-gray-100 bg-white z-10">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Find a Branch</h3>
                                <p className="text-sm text-gray-500 mt-1">Locate your nearest DK Telecom office</p>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by city, town or name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Scrollable List */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-2">
                            {filteredBranches.length > 0 ? (
                                filteredBranches.map((branch) => (
                                    <button
                                        key={branch.id}
                                        onClick={() => handleBranchClick(branch.id)}
                                        className={clsx(
                                            "w-full text-left p-4 rounded-xl transition-all duration-200 group border relative overflow-hidden",
                                            selectedBranchId === branch.id
                                                ? "bg-primary/5 border-primary/20 shadow-sm"
                                                : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-100"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className={clsx(
                                                "font-bold text-base transition-colors",
                                                selectedBranchId === branch.id ? "text-primary" : "text-gray-900 group-hover:text-primary"
                                            )}>
                                                {branch.name}
                                            </h4>
                                            {selectedBranchId === branch.id && (
                                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            )}
                                        </div>

                                        <div className="space-y-1.5 mb-3">
                                            <div className="flex items-start gap-2 text-sm text-gray-500">
                                                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                                <span className="line-clamp-2">{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                                <span>{branch.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock className="w-3 h-3 shrink-0" />
                                                <span>{branch.openingHours}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            View on Map <ChevronRight className="w-3 h-3 ml-1" />
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="py-12 text-center px-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-gray-900 font-medium">No branches found</p>
                                    <p className="text-gray-500 text-sm mt-1">Try adjusting your search terms</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-400">
                            Showing {filteredBranches.length} locations
                        </div>
                    </div>

                    {/* RIGHT PANEL: MAP */}
                    <div className="flex-1 bg-gray-100 relative h-1/2 lg:h-full">
                        <LeafletMap
                            branches={branches}
                            selectedBranchId={selectedBranchId}
                            onMarkerClick={handleBranchClick}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchLocator;

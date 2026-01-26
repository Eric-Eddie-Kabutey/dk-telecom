"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Branch } from "./types";
import BranchCard from "./BranchCard";
import { section } from "framer-motion/client";

type BranchLocatorProps = {
    branches: Branch[];
};

const BranchLocator = ({ branches }: BranchLocatorProps) => {
    // Filter states
    const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
    const [selectedTown, setSelectedTown] = useState<string>("All Towns");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Accordion state
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Derive unique regions and towns from data
    const regions = useMemo(() => {
        const uniqueRegions = Array.from(new Set(branches.map((b) => b.region)));
        return ["All Regions", ...uniqueRegions];
    }, [branches]);

    const towns = useMemo(() => {
        // Only show towns that match the selected region (if any)
        const relevantBranches = selectedRegion === "All Regions"
            ? branches
            : branches.filter(b => b.region === selectedRegion);

        const uniqueTowns = Array.from(new Set(relevantBranches.map((b) => b.town)));
        return ["All Towns", ...uniqueTowns];
    }, [branches, selectedRegion]);

    // Handle filter changes
    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
        setSelectedTown("All Towns");
        setExpandedId(null);
    };

    const handleTownChange = (town: string) => {
        setSelectedTown(town);
        setExpandedId(null);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setExpandedId(null);
    };

    // Filter branches
    const filteredBranches = useMemo(() => {
        return branches.filter((branch) => {
            const matchesRegion =
                selectedRegion === "All Regions" || branch.region === selectedRegion;
            const matchesTown =
                selectedTown === "All Towns" || branch.town === selectedTown;

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                searchQuery === "" ||
                branch.name.toLowerCase().includes(searchLower) ||
                branch.description.toLowerCase().includes(searchLower) ||
                branch.address.toLowerCase().includes(searchLower) ||
                branch.town.toLowerCase().includes(searchLower) ||
                branch.region.toLowerCase().includes(searchLower) ||
                branch.services.some(s => s.toLowerCase().includes(searchLower));

            return matchesRegion && matchesTown && matchesSearch;
        });
    }, [branches, selectedRegion, selectedTown, searchQuery]);

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="">
                {/* Filter Controls Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Region Select */}
                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase mb-3">
                            Select Region
                        </label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => handleRegionChange(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-sm px-4 py-4 text-sm text-gray-600 focus:ring-1 focus:ring-gray-200"
                        >
                            {regions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Town Select */}
                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase mb-3">
                            Select Town
                        </label>
                        <select
                            value={selectedTown}
                            onChange={(e) => handleTownChange(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-sm px-4 py-4 text-sm text-gray-600 focus:ring-1 focus:ring-gray-200"
                        >
                            {towns.map((town) => (
                                <option key={town} value={town}>
                                    {town}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Input */}
                    <div>
                        <label className="hidden md:block text-xs font-bold text-gray-900 uppercase mb-3">
                            Search
                        </label>
                        <div className="relative mt-auto">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full bg-gray-100 border-none rounded-sm pl-4 pr-10 py-[14px] text-sm text-gray-600 focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch List */}
            <div className="border-t border-gray-100">
                {filteredBranches.length > 0 ? (
                    filteredBranches.map((branch) => (
                        <BranchCard
                            key={branch.id}
                            branch={branch}
                            isExpanded={expandedId === branch.id}
                            onToggle={() =>
                                setExpandedId(expandedId === branch.id ? null : branch.id)
                            }
                        />
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-gray-500 italic">No branches found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BranchLocator;

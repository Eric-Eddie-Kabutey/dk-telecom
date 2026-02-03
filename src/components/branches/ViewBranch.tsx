"use client";

import dynamic from "next/dynamic";
import React from "react";

// SSR disabled for Leaflet
const LeafletMap = dynamic(() => import("./leaflet/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 animate-pulse rounded-xl">
            <span className="text-gray-400">Loading map...</span>
        </div>
    ),
});

type ViewBranchProps = {
    lat: number;
    lng: number;
    name: string;
    address: string;
};

const ViewBranch = ({ lat, lng, name, address }: ViewBranchProps) => {
    // Create a temporary branch object to satisfy the LeafletMap interface
    // which expects an array of full Branch objects
    const branchData = {
        id: 99999, // Temporary ID for view-only map
        name: name,
        address: address,
        description: "",
        phone: "",
        openingHours: "",
        services: [],
        region: "",
        town: "",
        location: {
            lat: lat,
            lng: lng
        }
    };

    return (
        <div className="w-full h-[300px] md:h-full min-h-[300px] border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <LeafletMap
                branches={[branchData]}
                selectedBranchId={99999}
                onMarkerClick={() => { }}
            />
        </div>
    );
};

export default ViewBranch;

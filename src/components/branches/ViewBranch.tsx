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
    return (
        <div className="w-full h-[300px] md:h-full min-h-[300px] border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <LeafletMap lat={lat} lng={lng} name={name} address={address} />
        </div>
    );
};

export default ViewBranch;

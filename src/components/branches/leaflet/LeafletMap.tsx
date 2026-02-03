import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Branch } from "../types";

// Fix for default marker icon issues in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle fitting bounds
const MapBounds = ({ branches, selectedBranchId }: { branches: Branch[], selectedBranchId: number | null }) => {
    const map = useMap();

    useEffect(() => {
        if (branches.length === 0) return;

        if (selectedBranchId) {
            const selected = branches.find(b => b.id === selectedBranchId);
            if (selected) {
                map.flyTo([selected.location.lat, selected.location.lng], 16, {
                    duration: 1.5
                });
            }
        } else {
            const bounds = L.latLngBounds(branches.map(b => [b.location.lat, b.location.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [branches, selectedBranchId, map]);

    return null;
};

type LeafletMapProps = {
    branches: Branch[];
    selectedBranchId: number | null;
    onMarkerClick?: (branchId: number) => void;
};

const LeafletMap = ({ branches, selectedBranchId, onMarkerClick }: LeafletMapProps) => {
    return (
        <MapContainer
            center={[13.4432, -16.7085]} // Default center (approx Gambia area)
            zoom={11}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
            style={{ minHeight: "400px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // Using a cleaner, light map style if available, or standard OSM
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBounds branches={branches} selectedBranchId={selectedBranchId} />

            {branches.map((branch) => (
                <Marker
                    key={branch.id}
                    position={[branch.location.lat, branch.location.lng]}
                    icon={icon}
                    eventHandlers={{
                        click: () => onMarkerClick && onMarkerClick(branch.id)
                    }}
                >
                    <Popup>
                        <div className="text-sm p-1">
                            <h3 className="font-bold text-gray-900 text-base mb-1">{branch.name}</h3>
                            <p className="text-gray-600 text-xs mb-2">{branch.address}</p>
                            <p className="text-primary font-semibold text-xs">{branch.phone}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;

export type BranchLocation = {
    lat: number;
    lng: number;
};

export type Branch = {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    openingHours: string;
    services: string[];
    region: string;
    town: string;
    location: BranchLocation;
};

export type BranchLocatorData = {
    title: string;
    img: string;
    branches: Branch[];
};

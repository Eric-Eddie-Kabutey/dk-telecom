"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { useSiteMode } from "@/context/SiteModeProvider";
import BranchLocator from "@/components/branches/BranchLocator";
import { FlashCard } from "@/components/FlashCard";

export default function BranchesPage() {
    const { text } = useSiteMode();
    const branchData = text.branchLocator;

    if (!branchData) return null;

    return (
        <main className="container bg-white min-h-screen">
            <div className="mt-[200px] ">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 capitalize mb-1">
                    {branchData.title}
                </h2>
            </div>
            <BranchLocator branches={branchData.branches} />
            <FlashCard
                title={"Get Connected Instantly"}
                subtitle={"Experience fiber-speed internet with zero lag, enterprise-grade reliability, and concierge onboarding for your entire household."}
                buttonText="Request a Sales Call"
                buttonRoute="/contact"
                gradientColors={["#4B46E5", "#2E2A8F"]}
            />
        </main>
    );
}
"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { PackageList } from "@/components/packages/PackageList";
import { Benefits } from "@/components/business/Benefits";
import { FlashCard } from "@/components/FlashCard";
import { useSiteMode } from "@/context/SiteModeProvider";

export default function PackagesPage() {
    const { text } = useSiteMode();

    return (
        <>
            <HeroSimple
                tag={text.packages.hero.tag}
                title={text.packages.hero.title}
                subtitle={text.packages.hero.subtitle}
                image={text.packages.hero.img}
            />
            <PackageList />
            <Benefits />
            <FlashCard
                title={"Experience Reliable\nInternet With DK"}
                subtitle={"Haven't found what you're looking for? Save time experts for\nexclusive deals - we answer calls"}
                buttonText="Request a Sales Call"
                buttonRoute="/contact"
                gradientColors={["#4B46E5", "#2E2A8F"]}
            />
        </>
    );
}

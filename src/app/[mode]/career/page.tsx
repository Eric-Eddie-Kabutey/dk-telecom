"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { BuildSomethingMeaningful } from "@/components/BuildSomethingMeaningful";
import { OpenRoles } from "@/components/OpenRoles";
import { FlashCard } from "@/components/FlashCard";
import { useSiteMode } from "@/context/SiteModeProvider";

export default function CareerPage() {
    const { text } = useSiteMode();

    return (
        <>
            <HeroSimple
                tag={text.career.hero.tag}
                title={text.career.hero.title}
                subtitle={text.career.hero.subtitle}
                image={text.career.hero.img}
            />
            <BuildSomethingMeaningful />
            <OpenRoles />
            <FlashCard
                title={text.career.callToAction.title}
                subtitle={text.career.callToAction.subtitle}
                buttonText={text.career.callToAction.button.text}
                buttonRoute={text.career.callToAction.button.href}
                gradientColors={["#4B46E5", "#2E2A8F"]}
                img={text.career.callToAction.img}
            />
        </>
    );
}
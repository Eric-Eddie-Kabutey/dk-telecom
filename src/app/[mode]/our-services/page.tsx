"use client";

import { FlashCard } from "@/components/FlashCard";
import { HeroSimple } from "@/components/HeroSimple";
import { ServiceList } from "@/components/ServiceList";
import { useSiteMode } from "@/context/SiteModeProvider";

export default function ServicesPage() {
    const { text } = useSiteMode();
    return (
        <>
            <HeroSimple
                tag={text.services.hero.tag}
                title={text.services.hero.title}
                subtitle={text.services.hero.subtitle}
                image={text.services.hero.img}
            />
            <ServiceList />
            {/* <FlashCard
                title={text.career.callToAction.title}
                subtitle={text.career.callToAction.subtitle}
                buttonText={text.career.callToAction.button.text}
                buttonRoute={text.career.callToAction.button.href}
                gradientColors={["#4B46E5", "#2E2A8F"]}
                img={text.career.callToAction.img}
            /> */}
        </>
    );
}

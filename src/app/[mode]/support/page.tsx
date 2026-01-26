"use client";

import { HelpCenter } from "@/components/support/HelpCenter";
import { HeroSimple } from "@/components/HeroSimple";
import { useSiteMode } from "@/context/SiteModeProvider";
export default function SupportPage() {
    const { text } = useSiteMode();
    return (
        <>
            {/* <HeroSimple
                tag={text.services.hero.tag}
                title={text.services.hero.title}
                subtitle={text.services.hero.subtitle}
                image={text.services.hero.img}
            /> */}
            <HelpCenter />
        </>
    );
}

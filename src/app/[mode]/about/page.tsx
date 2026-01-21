"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { HowWeStandOut } from "@/components/HowWeStandOut";
import { LatestNews } from "@/components/LatestNews";
import { OurMission } from "@/components/OurMission";
import { Team } from "@/components/Team";
import { WhatWeDo } from "@/components/WhatWeDo";
import { useSiteMode } from "@/context/SiteModeProvider";
import { useParams } from "next/navigation";

export default function AboutPage() {
    const { mode: currentMode, text } = useSiteMode();
    const params = useParams();
    const modeFromUrl = params.mode as string;
    return (
        <>
            <HeroSimple
                tag={text.AboutUs.hero.tag}
                title={text.AboutUs.hero.title}
                subtitle={text.AboutUs.hero.subtitle}
                image={text.AboutUs.hero.img}
            />
            <WhatWeDo />
            <OurMission />
            <LatestNews viewAllHref={currentMode === "business" ? "/business/blog" : "/residential/blog"} />
            <Team />
            <HowWeStandOut />
        </>
    );
}

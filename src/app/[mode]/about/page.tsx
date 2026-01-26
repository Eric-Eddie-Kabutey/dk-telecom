"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { HowWeStandOut } from "@/components/about/HowWeStandOut";
import { LatestNews } from "@/components/about/LatestNews";
import { OurMission } from "@/components/about/OurMission";
import { Team } from "@/components/about/Team";
import { WhatWeDo } from "@/components/about/WhatWeDo";
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

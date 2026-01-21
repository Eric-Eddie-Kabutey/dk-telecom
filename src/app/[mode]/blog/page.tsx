"use client";

import { HeroSimple } from "@/components/HeroSimple";
import { LatestNews } from "@/components/LatestNews";
import { useSiteMode } from "@/context/SiteModeProvider";

export default function BlogPage() {
    const { text } = useSiteMode();
    return (
        <>
            <HeroSimple
                tag={text.insights.hero.tag}
                title={text.insights.hero.title}
                subtitle={text.insights.hero.subtitle}
                image={text.insights.hero.img}
            />
            <LatestNews />
            
        </>
    );
}

"use client";

import { ContactUsForm } from "@/components/support/ContactUsForm";
import { HeroSimple } from "@/components/HeroSimple";
import { useSiteMode } from "@/context/SiteModeProvider";

export default function ContactPage() {
    const { text } = useSiteMode();
    return (
        <>
            <ContactUsForm />
            {/* <HeroSimple
                tag={text.services.hero.tag}
                title={text.services.hero.title}
                subtitle={text.services.hero.subtitle}
                image={text.services.hero.img}
            /> */}

        </>
    );
}

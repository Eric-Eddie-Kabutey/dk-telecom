"use client";

import { HeroMain } from "@/components/HeroMain";
import { HeroSimple } from "@/components/HeroSimple";
import { GetStarted } from "@/components/GetStarted";
import { FastInternet } from "@/components/FastInternet";
import { PaymentHub } from "@/components/PaymentHub";
import { HowWeStandOut } from "@/components/HowWeStandOut";
import { FamilyPlus } from "@/components/FamilyPlus";
import ComponentCarousel from "@/components/ComponentCarousel";
import { FlashCard } from "@/components/FlashCard";
import { ContactUsForm } from "@/components/ContactUsForm";
import { HelpCenter } from "@/components/HelpCenter";
import { useSiteMode } from "@/context/SiteModeProvider";
import { WhatWedo } from "@/components/WhatWeDo";
import { OurMission } from "@/components/OurMission";
import { LatestNews } from "@/components/LatestNews";
import { Team } from "@/components/Team";
import { ServiceList } from "@/components/ServiceList";
import { BuildSomethingMeaningful } from "@/components/BuildSomethingMeaningful";
import { OpenRoles } from "@/components/OpenRoles";
import { PackageList } from "@/components/PackageList";
import { Benefits } from "@/components/Benefits";

export default function ResidentialHome() {
    const { text } = useSiteMode();
    return (
        <>
            <HeroMain />
            <GetStarted />
            <FastInternet variant="family" />
            <PaymentHub />
            <FamilyPlus />
            <FastInternet variant="streaming" />
            <HowWeStandOut />
            <ComponentCarousel autoPlay intervalMs={7000} pauseOnHover>
                <FastInternet variant="family" />
                <PaymentHub />
                <FamilyPlus />
                <FastInternet variant="streaming" />
            </ComponentCarousel>
            <ContactUsForm />
            <HelpCenter />
            <HeroSimple
                tag={text.AboutUs.hero.tag}
                title={text.AboutUs.hero.title}
                subtitle={text.AboutUs.hero.subtitle}
                image={text.AboutUs.hero.img}
            />
            <WhatWedo />
            <OurMission />
            <LatestNews />
            <Team />
            <ServiceList />
            <BuildSomethingMeaningful />
            <OpenRoles />
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

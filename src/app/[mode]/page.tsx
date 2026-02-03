"use client";

import { HeroMain } from "@/components/home/HeroMain";
import { HeroSimple } from "@/components/HeroSimple";
import { GetStarted } from "@/components/home/GetStarted";
import { FastInternet } from "@/components/home/FastInternet";
import { PaymentHub } from "@/components/home/PaymentHub";
import { HowWeStandOut } from "@/components/about/HowWeStandOut";
import { FamilyPlus } from "@/components/home/FamilyPlus";
import ComponentCarousel from "@/components/home/ComponentCarousel";
import { FlashCard } from "@/components/FlashCard";
import { ContactUsForm } from "@/components/support/ContactUsForm";
import { HelpCenter } from "@/components/support/HelpCenter";
import { useSiteMode } from "@/context/SiteModeProvider";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { OurMission } from "@/components/about/OurMission";
import { LatestNews } from "@/components/about/LatestNews";
import { Team } from "@/components/about/Team";
import { ServiceList } from "@/components/services/ServiceList";
import { BuildSomethingMeaningful } from "@/components/career/BuildSomethingMeaningful";
import { OpenRoles } from "@/components/career/OpenRoles";
import { PackageList } from "@/components/packages/PackageList";
import { Benefits } from "@/components/business/Benefits";
import { TransformSection } from "@/components/business/TransformSection";
import { OfferList } from "@/components/business/OfferList";
import { useParams } from "next/navigation";
import { Offer, OfferItem } from "@/components/home/Offer";

export default function UnifiedHome() {
    const { mode: currentMode, text } = useSiteMode();
    const params = useParams();
    const modeFromUrl = params.mode as string;

    const isResidential = modeFromUrl === "residential";
    type OffersData = {
        title: string;
        offerslist: OfferItem[];
    };
    const offers = text?.offers as OffersData;


    return (
        <>
            <HeroMain />
            <GetStarted />
            {isResidential ? (
                <>
                    <FastInternet variant="family" />
                    {/* <FamilyPlus /> */}
                    <ComponentCarousel autoPlay intervalMs={7000} pauseOnHover>
                        <div className="container">
                            <Offer
                                offer={offers?.offerslist[0]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                                page="residential"
                                ctaHref={`/${currentMode}/packages`}
                            />
                        </div>
                        <div className="container">
                            <Offer
                                offer={offers?.offerslist[1]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                                page="residential"
                                ctaHref={`/${currentMode}/packages`}
                            />
                        </div>
                        <div className="container">
                            <Offer
                                offer={offers?.offerslist[2]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                                page="residential"
                                ctaHref={`/${currentMode}/packages`}
                            />
                        </div>
                    </ComponentCarousel>
                    <FastInternet variant="streaming" />
                    <HowWeStandOut />
                    <FlashCard
                        title={"Get Connected Instantly"}
                        subtitle={"Experience fiber-speed internet with zero lag, enterprise-grade reliability, and concierge onboarding for your entire household."}
                        buttonText="Request a Sales Call"
                        buttonRoute="/contact"
                        gradientColors={["#4B46E5", "#2E2A8F"]}
                    />
                </>
            ) : (
                <>
                    <OfferList requestHref="/contact" />
                    <Benefits />
                    <TransformSection />
                </>
            )}
        </>
    );
}

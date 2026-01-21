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
import { WhatWeDo } from "@/components/WhatWeDo";
import { OurMission } from "@/components/OurMission";
import { LatestNews } from "@/components/LatestNews";
import { Team } from "@/components/Team";
import { ServiceList } from "@/components/ServiceList";
import { BuildSomethingMeaningful } from "@/components/BuildSomethingMeaningful";
import { OpenRoles } from "@/components/OpenRoles";
import { PackageList } from "@/components/PackageList";
import { Benefits } from "@/components/Benefits";
import { TransformSection } from "@/components/TransformSection";
import { OfferList } from "@/components/OfferList";
import { useParams } from "next/navigation";
import { Offer, OfferItem } from "@/components/Offer";

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
                        <div className="container-compact my-20">
                            <Offer
                                offer={offers?.offerslist[0]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                            />
                        </div>
                        <div className="container-compact">
                            <Offer
                                offer={offers?.offerslist[1]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                            />
                        </div>
                        <div className="container-compact">
                            <Offer
                                offer={offers?.offerslist[2]}
                                size="sm"
                                imageSide="right"
                                contentSide="left"
                                badgePosition="top-right"
                                badgeRotation="8deg"
                                className="h-full"
                            />
                        </div>
                    </ComponentCarousel>
                    <FastInternet variant="streaming" />
                    <HowWeStandOut />
                    <FlashCard
                        title={"Experience Reliable\nInternet With DK"}
                        subtitle={"Haven't found what you're looking for? Save time experts for\nexclusive deals - we answer calls"}
                        buttonText="Request a Sales Call"
                        buttonRoute="/contact"
                        gradientColors={["#4B46E5", "#2E2A8F"]}
                    />
                </>
            ) : (
                <>
                    <OfferList requestHref="/contact" />
                    <TransformSection />
                </>
            )}
        </>
    );
}

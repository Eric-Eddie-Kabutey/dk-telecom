"use client";

import { Hero } from "@/components/Hero";
import { GetStarted } from "@/components/GetStarted";
import { FastInternet } from "@/components/FastInternet";
import { PaymentHub } from "@/components/PaymentHub";
import { HowWeStandOut } from "@/components/HowWeStandOut";
import { FamilyPlus } from "@/components/FamilyPlus";
import ComponentCarousel from "@/components/ComponentCarousel";
import { FlashCard } from "@/components/FlashCard";
import { ContactUsForm } from "@/components/ContactUsForm";
import { HelpCenter } from "@/components/HelpCenter";

export default function ResidentialHome() {
    return (
        <>
            <Hero />
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

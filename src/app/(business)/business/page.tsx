"use client";

import { Hero } from "@/components/Hero";
import { GetStarted } from "@/components/GetStarted";
import { FastInternet } from "@/components/FastInternet";
import { PaymentHub } from "@/components/PaymentHub";
import { HowWeStandOut } from "@/components/HowWeStandOut";

export default function BusinessHome() {
    return (
        <>
            <Hero />
            <GetStarted />
            <FastInternet variant="family" />
            <PaymentHub />
            <FastInternet variant="streaming" />
            <HowWeStandOut />
        </>
    );
}

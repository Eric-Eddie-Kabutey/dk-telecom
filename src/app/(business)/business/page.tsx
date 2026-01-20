"use client";

import { HeroMain } from "@/components/HeroMain";
import { GetStarted } from "@/components/GetStarted";
import { FastInternet } from "@/components/FastInternet";
import { PaymentHub } from "@/components/PaymentHub";
import { HowWeStandOut } from "@/components/HowWeStandOut";

export default function BusinessHome() {
    return (
        <>
            <HeroMain />
            <GetStarted />
            <FastInternet variant="family" />
            <PaymentHub />
            <FastInternet variant="streaming" />
            <HowWeStandOut />
        </>
    );
}

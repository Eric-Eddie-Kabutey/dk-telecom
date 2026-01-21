"use client";

import { NavBar } from "@/components/NavBar";
import { AboveNavBar } from "@/components/AboveNavBar";
import { Footer } from "@/components/Footer";
import { useParams } from "next/navigation";

export default function ModeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const mode = params.mode as string;

    return (
        <div className="flex flex-col min-h-screen">
            {mode === "business" && <AboveNavBar />}
            <NavBar />
            <main className="flex-grow relative">
                {children}
            </main>
            <Footer />
        </div>
    );
}

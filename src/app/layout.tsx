import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteModeProvider } from "@/context/SiteModeProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { InitialLoader } from "@/components/InitialLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DK Telecom",
    description: "Premium High-Speed Internet Solutions",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <InitialLoader>
                    {children}
                    <WhatsAppButton />
                </InitialLoader>
            </body>
        </html>
    );
}

import { NavBar } from "@/components/NavBar";
import { AboveNavBar } from "@/components/AboveNavBar";
import { Footer } from "@/components/Footer";

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <AboveNavBar />
            <NavBar />
            <main className="flex-grow relative">
                {children}
            </main>
            <Footer />
        </div>
    );
}

"use client";

import React from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { Member } from "@/components/about/Member";

type TeamMember = {
    id: number;
    img: string;
    name: string;
    position: string;
};

type TeamSectionProps = {
    className?: string;
    id?: string;
};

export const Team: React.FC<TeamSectionProps> = ({
    className,
    id = "team",
}) => {
    const { text } = useSiteMode();

    const team = text?.AboutUs?.team as {
        title: string;
        subtitle: string;
        members: TeamMember[];
    };

    if (!team) return null;

    return (
        <section id={id} className={clsx("w-full py-14 sm:py-16", className)}>
            <div className="container-inner">
                <h2 className="mx-auto mt-3 max-w-md text-center text-2xl sm:text-3xl font-bold text-gray-900">
                    {team.title}
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-center text-sm text-gray-600">
                    {team.subtitle}
                </p>

                <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {(team.members ?? []).map((m) => (
                        <Member
                            key={m.id}
                            img={m.img}
                            name={m.name}
                            position={`CEO DK TELECOM`.toLowerCase() === m.position.toLowerCase()
                                ? m.position
                                : `${m.position} dk telecom`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

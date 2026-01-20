"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { RoleCard } from "@/components/RoleCard";

type Role = {
    id: number;
    unit: string;
    type: string;
    title: string;
    description: string;
    date: string;
};

type OpenRolesProps = {
    className?: string;
    id?: string;
};

type TagId = "all" | "non-technical" | "technical";

const TAGS: { id: TagId; title: string }[] = [
    { id: "all", title: "All Roles" },
    { id: "non-technical", title: "Non Technical" },
    { id: "technical", title: "Technical" },
];

function isTechnical(unit: string) {
    const u = unit.toLowerCase();
    // tweak this list anytime
    const techUnits = ["software", "engineering", "network", "technical", "it", "devops"];
    return techUnits.some((k) => u.includes(k));
}

export const OpenRoles: React.FC<OpenRolesProps> = ({
    className,
    id = "open-roles",
}) => {
    const { text } = useSiteMode();

    const openRoles = text?.career?.openRoles as {
        title: string;
        subtitle: string;
        roles: Role[];
    };

    const [activeTag, setActiveTag] = useState<TagId>("all");
    const [query, setQuery] = useState("");

    const roles = openRoles?.roles ?? [];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return roles.filter((r) => {
            // tag filter
            const tech = isTechnical(r.unit);
            const tagOk =
                activeTag === "all"
                    ? true
                    : activeTag === "technical"
                        ? tech
                        : !tech;

            if (!tagOk) return false;

            // search filter
            if (!q) return true;

            const haystack = `${r.title} ${r.description} ${r.unit} ${r.type} ${r.date}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [roles, activeTag, query]);

    if (!openRoles) return null;

    return (
        <section id={id} className={clsx("w-full py-20", className)}>
            <div className="container">
                {/* Title */}
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 capitalize">
                    {openRoles.title}
                </h2>
                <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base text-gray-600">
                    {openRoles.subtitle}
                </p>

                {/* Tags */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {TAGS.map((t) => {
                        const isActive = activeTag === t.id;

                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTag(t.id)}
                                className={clsx(
                                    "rounded-full border px-5 py-2 text-sm font-medium transition",
                                    isActive
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                )}
                            >
                                {t.title}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="mt-6 flex justify-center">
                    <div className="relative w-full max-w-3xl">
                        <Search
                            size={18}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Roles"
                            className={clsx(
                                "w-full rounded-full bg-gray-100 border border-gray-200",
                                "py-4 pl-12 pr-5 text-sm text-gray-900 outline-none",
                                "focus:bg-white focus:border-gray-300"
                            )}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((role) => (
                        <RoleCard key={role.id} role={role} />
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <p className="mt-10 text-center text-sm text-gray-500">
                        No roles found. Try a different search 😅
                    </p>
                )}
            </div>
        </section>
    );
};

"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSiteMode } from "@/context/SiteModeProvider";
import {
    Search,
    Wifi,
    CreditCard,
    User,
    Headset,
    Settings,
    Shield,
    Smartphone,
    type LucideIcon,
} from "lucide-react";

type HelpArticle = {
    title: string;
    href: string;
    keywords?: string[];
};

type HelpCategory = {
    id: string;
    title: string;
    icon: keyof typeof ICONS;
    href: string;
    keywords?: string[];
    articles?: HelpArticle[];
};

const ICONS = {
    Wifi,
    CreditCard,
    User,
    Headset,
    Settings,
    Shield,
    Smartphone,
} satisfies Record<string, LucideIcon>;

const norm = (s: string) => (s ?? "").toLowerCase().trim();

export const HelpCenter = () => {
    const { text } = useSiteMode();

    const help = text.help;
    const categories = (help?.categories ?? []) as HelpCategory[];

    const [query, setQuery] = useState("");
    const resultsRef = useRef<HTMLDivElement | null>(null);

    const q = norm(query);

    const filteredCategories = useMemo(() => {
        if (!q) return categories;

        return categories.filter((c) => {
            const hay = [
                c.title,
                ...(c.keywords ?? []),
                ...(c.articles?.flatMap((a) => [a.title, ...(a.keywords ?? [])]) ?? []),
            ]
                .map(norm)
                .join(" ");

            return hay.includes(q);
        });
    }, [categories, q]);

    const matchedArticles = useMemo(() => {
        if (!q) return [];

        const out: { categoryTitle: string; article: HelpArticle }[] = [];

        for (const c of categories) {
            for (const a of c.articles ?? []) {
                const hay = [a.title, ...(a.keywords ?? []), c.title, ...(c.keywords ?? [])]
                    .map(norm)
                    .join(" ");

                if (hay.includes(q)) out.push({ categoryTitle: c.title, article: a });
            }
        }

        return out.slice(0, 8); // keep it tidy
    }, [categories, q]);

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="bg-white">
            {/* HERO */}
            <section className="bg-primary text-white">
                <div className="container px-4 py-12 sm:py-16 lg:py-20">
                    <p className="text-xs font-semibold tracking-widest text-white/80">
                        {help?.hero?.kicker ?? "HELP"}
                    </p>

                    <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                        {help?.hero?.title ?? "Welcome To Our Help Center"}
                    </h1>

                    {/* Search */}
                    <form
                        onSubmit={onSearchSubmit}
                        className="mt-8 w-full max-w-5xl"
                    >
                        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm">
                            <Search className="text-gray-500" size={18} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={help?.hero?.searchPlaceholder ?? "Search through our help center"}
                                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
                                aria-label="Search help center"
                            />
                        </div>
                    </form>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-12 sm:py-16">
                <div className="container px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {help?.section?.title ?? "Help & Support"}
                        </h2>
                        <p className="mt-3 text-sm text-gray-600 sm:text-base">
                            {help?.section?.subtitle ??
                                "Welcome to dk telecom Media's help and support page. Pick a category to get started."}
                        </p>
                    </div>

                    {/* Results anchor */}
                    <div ref={resultsRef} className="mt-10" />

                    {/* If searching: show results count */}
                    {q && (
                        <div className="mb-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredCategories.length}</span> categories
                                {matchedArticles.length ? (
                                    <>
                                        {" "}
                                        and <span className="font-semibold">{matchedArticles.length}</span> articles
                                    </>
                                ) : null}
                                {" "}for “<span className="font-semibold">{query}</span>”
                            </p>

                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="text-sm font-medium text-primary hover:opacity-80"
                            >
                                Clear search
                            </button>
                        </div>
                    )}

                    {/* Categories grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredCategories.map((cat) => {
                            const Icon = ICONS[cat.icon] ?? Wifi;

                            return (
                                <Link
                                    key={cat.id}
                                    href={cat.href}
                                    className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-100">
                                            <Icon className="text-primary" size={22} />
                                        </div>

                                        <p className="mt-4 text-sm font-medium text-gray-800">
                                            {cat.title}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Empty state */}
                    {q && filteredCategories.length === 0 && matchedArticles.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                            <p className="text-sm text-gray-700">
                                No results found for “<span className="font-semibold">{query}</span>”. Try a different keyword 👀
                            </p>
                        </div>
                    )}

                    {/* Articles results (optional but fire) */}
                    {q && matchedArticles.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900">Top articles</h3>
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {matchedArticles.map(({ categoryTitle, article }) => (
                                    <Link
                                        key={article.href}
                                        href={article.href}
                                        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                                    >
                                        <p className="text-sm font-semibold text-gray-900">{article.title}</p>
                                        <p className="mt-1 text-xs text-gray-500">{categoryTitle}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

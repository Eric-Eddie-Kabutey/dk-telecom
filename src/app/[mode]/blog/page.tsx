"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { HeroSimple } from "@/components/HeroSimple";
import { BlogCard } from "@/components/blog/BlogCard";

type Article = {
    id: number;
    title: string;
    img: string;
    body: string;
    href?: string;
    button?: string;
    categoryId?: string;
    content?: string[];
};

type FilterId = "all" | "case studies";

export default function BlogPage() {
    const { text } = useSiteMode();

    const latestNews = text?.AboutUs?.latestNews as {
        title: string;
        filters: { id: string; title: string }[];
        articles: Article[];
    };

    const [activeFilter, setActiveFilter] = useState<FilterId>("all");
    const [query, setQuery] = useState("");

    const articles = latestNews?.articles ?? [];
    const filters = latestNews?.filters ?? [];

    const filteredArticles = useMemo(() => {
        const q = query.trim().toLowerCase();

        return articles.filter((article) => {
            // Filter by category
            const categoryMatch =
                activeFilter === "all"
                    ? true
                    : (article.categoryId ?? "news") === activeFilter;

            if (!categoryMatch) return false;

            // Filter by search query
            if (!q) return true;

            const haystack = `${article.title} ${article.body} ${article.categoryId ?? ""}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [articles, activeFilter, query]);

    return (
        <>
            <HeroSimple
                tag="Blog"
                title="Latest News & Insights"
                subtitle="Stay updated with our latest projects, community initiatives, and industry insights from DK Telecom"
                image="/assets/resources/insights/1.png"
            />

            <section className="w-full section-py">
                <div className="container">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id as FilterId)}
                                    className={clsx(
                                        "rounded-full border px-5 py-2 text-button transition",
                                        isActive
                                            ? "bg-primary text-white border-primary shadow-sm"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    {filter.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <div className="flex justify-center mb-12">
                        <div className="relative w-full max-w-2xl">
                            <Search
                                size={18}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles..."
                                className={clsx(
                                    "w-full rounded-full bg-gray-100 border border-gray-200",
                                    "py-4 pl-12 pr-5 text-body text-gray-900 outline-none",
                                    "focus:bg-white focus:border-gray-300"
                                )}
                            />
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredArticles.map((article) => (
                            <BlogCard key={article.id} article={article} />
                        ))}
                    </div>

                    {/* Empty state */}
                    {filteredArticles.length === 0 && (
                        <p className="mt-10 text-center text-body text-gray-500">
                            No articles found. Try a different search or filter.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { ArticleCard } from "@/components/ArticleCard";

type LatestNewsFilter = {
  id: string; // "all" | "news" | "events" | "case studies"
  title: string;
};

type LatestNewsArticle = {
  id: number;
  title: string;
  img: string;
  body: string;
  href: string;
  button?: string;

  // 🔥 Add this in your JSON if you want proper filtering:
  // categoryId: "news" | "events" | "case studies"
  categoryId?: string;
};

type LatestNewsSectionProps = {
  className?: string;

  // how many cards to show (screenshot shows 3)
  initialCount?: number;

  // if provided, "View All" becomes a link
  viewAllHref?: string;

  // optional custom heading id for anchor linking
  id?: string;
};

export const LatestNews: React.FC<LatestNewsSectionProps> = ({
  className,
  initialCount = 3,
  viewAllHref,
  id = "latest-news",
}) => {
  const { text } = useSiteMode();

  const latestNews = text?.AboutUs?.latestNews as {
    title: string;
    filters: LatestNewsFilter[];
    articles: LatestNewsArticle[];
  };

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<boolean>(false);

  const filteredArticles = useMemo(() => {
    const articles = latestNews?.articles ?? [];

    if (activeFilter === "all") return articles;

    // ✅ If categoryId is missing, default to "news" so filtering still works
    return articles.filter((a) => (a.categoryId ?? "news") === activeFilter);
  }, [activeFilter, latestNews?.articles]);

  const visibleArticles = useMemo(() => {
    if (expanded) return filteredArticles;
    return filteredArticles.slice(0, initialCount);
  }, [expanded, filteredArticles, initialCount]);

  if (!latestNews) return null;

  return (
    <section id={id} className={clsx("w-full ", className)}>
      <div className="container">
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900">
          {latestNews.title}
        </h2>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {(latestNews.filters ?? []).map((f) => {
            const isActive = activeFilter === f.id;

            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  setExpanded(false);
                }}
                className={clsx(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  "border",
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                )}
              >
                {f.title}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((a) => (
            <ArticleCard
              key={a.id}
              title={a.title}
              body={a.body}
              img={a.img}
              href={a.href}
              buttonLabel={a.button ?? "Read more"}
              imageAlt={a.title}
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 flex justify-center">
          {viewAllHref ? (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              View All <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              {expanded ? "Show Less" : "View All"} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useSiteMode } from "@/context/SiteModeProvider";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { findRoleBySlug } from "@/utils/slugify";

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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { text } = useSiteMode();
    const { slug } = use(params);

    const latestNews = text?.AboutUs?.latestNews as {
        title: string;
        filters: { id: string; title: string }[];
        articles: Article[];
    };

    const articles = latestNews?.articles ?? [];
    const article = findRoleBySlug(articles, slug);

    if (!article) {
        notFound();
    }

    return <BlogDetail article={article} />;
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";

type Article = {
    id: number;
    title: string;
    img: string;
    body: string;
    categoryId?: string;
    content?: string[];
};

type BlogDetailProps = {
    article: Article;
    className?: string;
};

export const BlogDetail: React.FC<BlogDetailProps> = ({ article, className }) => {
    const { mode } = useSiteMode();

    return (
        <div className={clsx("w-full pb-20 pt-40", className)}>
            <div className="container max-w-4xl">
                {/* Back button */}
                <Link
                    href={`/${mode}/blog`}
                    className="inline-flex items-center gap-2 text-button text-gray-600 hover:text-gray-900 transition mb-8"
                >
                    <ArrowLeft size={18} />
                    Back to Blog
                </Link>

                {/* Article header */}
                <div className="stack-md mb-10">
                    {/* Category badge */}
                    {article.categoryId && (
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-primary" />
                            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-button font-medium text-primary capitalize">
                                {article.categoryId}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-h1 font-bold text-dark leading-tight">
                        {article.title}
                    </h1>
                </div>

                {/* Featured image */}
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-10 bg-gray-100">
                    <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Article content */}
                <div className="prose prose-lg max-w-none">
                    {article.content && article.content.length > 0 ? (
                        article.content.map((paragraph, index) => (
                            <p
                                key={index}
                                className="text-body text-dark/80 leading-relaxed text-lg mb-6"
                            >
                                {paragraph}
                            </p>
                        ))
                    ) : (
                        <p className="text-body text-dark/80 leading-relaxed text-lg">
                            {article.body}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <hr className="my-12 border-gray-200" />

                {/* CTA Section */}
                <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
                    <h3 className="text-h3 font-bold mb-3">Want to Learn More?</h3>
                    <p className="text-body mb-6 opacity-90">
                        Discover how DK Telecom can support your organization or community with reliable connectivity solutions.
                    </p>
                    <Link
                        href={`/${mode}/contact`}
                        className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-button font-semibold text-primary hover:bg-gray-50 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

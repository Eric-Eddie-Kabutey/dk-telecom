"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useSiteMode } from "@/context/SiteModeProvider";
import { slugify } from "@/utils/slugify";

type Article = {
    id: number;
    title: string;
    img: string;
    body: string;
    href?: string;
    button?: string;
    categoryId?: string;
};

type BlogCardProps = {
    article: Article;
    className?: string;
};

export const BlogCard: React.FC<BlogCardProps> = ({ article, className }) => {
    const { mode } = useSiteMode();
    const slug = slugify(article.title);

    return (
        <Link
            href={`/${mode}/blog/${slug}`}
            className={clsx(
                "group flex flex-col overflow-hidden mb-4 transitio",
                className
            )}
        >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 stack-sm">
                {/* Category badge */}
                {/* {article.categoryId && (
                    <span className="inline-flex self-start rounded-full bg-primary/10 px-3 py-1 text-caption font-medium text-primary capitalize">
                        {article.categoryId}
                    </span>
                )} */}

                {/* Title */}
                <h3 className="text-h4 font-bold text-dark leading-snug line-clamp-2 transition-colors">
                    {article.title}
                </h3>

                {/* Description */}
                <p className="text-body text-dark/70 leading-relaxed line-clamp-3 flex-1">
                    {article.body}
                </p>

                {/* Read more link */}
                <div className="flex items-center gap-2 text-button group-hover:text-primary font-medium mt-4">
                    {article.button || "READ MORE"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

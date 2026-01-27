"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type ArticleCardProps = {
    title: string;
    body: string;
    img: string;
    href: string;
    buttonLabel?: string;
    className?: string;
    imageAlt?: string;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    body,
    img,
    href,
    buttonLabel = "Read more",
    className,
    imageAlt = "",
}) => {
    return (
        <article className={clsx("group w-full bg-white transition", className)}>
            {/* ✅ overflow-hidden so the scaled image stays inside */}
            <div className="relative aspect-[16/9] w-full overflow-hidden ">
                <Image
                    src={img}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                    className={clsx(
                        "object-cover",
                        // ✅ smooth zoom on hover
                        "transition-transform duration-500 ease-out",
                        "group-hover:scale-105"
                    )}
                />
            </div>

            <div className="py-5 sm:py-6">
                <h3 className="text-h4 font-bold text-gray-900 leading-snug">
                    {title}
                </h3>

                <p className="mt-2 text-body text-gray-600 leading-relaxed line-clamp-3">
                    {body}
                </p>

                <div className="mt-4">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-button text-gray-800 hover:bg-gray-50 transition"
                    >
                        {buttonLabel}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

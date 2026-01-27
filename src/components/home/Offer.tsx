"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Check, ArrowRight } from "lucide-react";

type OfferFeature = { title: string };

export type OfferItem = {
    id: number;
    tagline: string;
    title: string;
    img: string;
    color: string;
    bandwidth: string;
    features: OfferFeature[];
};

export type BadgePosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center-left"
    | "center-right";

export type Placement = "left" | "right" | "top" | "bottom";

type OfferProps = {
    offer: OfferItem;
    className?: string;

    imageSide: Placement;
    contentSide: Placement;
    badgePosition: BadgePosition;

    ctaText?: string;
    onCtaClick?: () => void;

    size?: "lg" | "sm";
    imageObjectPosition?: "left" | "right" | "center";

    badgeRotation?: string;
    page?: "business" | "residential";
};

const hexToRgb = (hex: string) => {
    const cleaned = hex.replace("#", "");
    const full =
        cleaned.length === 3
            ? cleaned.split("").map((c) => c + c).join("")
            : cleaned;

    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return { r, g, b };
};

const toMobileTB = (p: Placement): "top" | "bottom" =>
    p === "right" || p === "bottom" ? "bottom" : "top";

const badgePosClass = (pos: BadgePosition) => {
    switch (pos) {
        case "top-left":
            return "bottom-6 right-6 md:top-7 md:left-7";
        case "top-right":
            return "bottom-6 right-6 md:top-7 md:right-7";
        case "bottom-left":
            return "bottom-6 left-6 md:bottom-7 md:left-7";
        case "bottom-right":
            return "bottom-6 right-6 md:bottom-7 md:right-7";
        case "center-left":
            return "top-1/2 -translate-y-1/2 left-6 md:left-7";
        case "center-right":
            return "top-1/2 -translate-y-1/2 right-6 md:right-7";
        default:
            return "top-6 right-6 md:top-7 md:right-7";
    }
};

/**
 * ✅ Overlay direction based on CONTENT position
 * strong near content -> fades away from content
 */
const imageOverlayByContent = (side: Placement, rgb: { r: number; g: number; b: number }) => {
    const { r, g, b } = rgb;

    const strong = `rgba(${r},${g},${b},1)`;
    const mid = `rgba(${r},${g},${b},0.75)`;
    const soft = `rgba(${r},${g},${b},0.38)`;
    const none = `rgba(${r},${g},${b},0.00)`;

    switch (side) {
        case "left":
            // content left => overlay strongest on left, fades right
            return `linear-gradient(90deg, ${strong} 0%, ${mid} 45%, ${soft} 75%, ${none} 100%)`;
        case "right":
            return `linear-gradient(270deg, ${strong} 0%, ${mid} 45%, ${soft} 75%, ${none} 100%)`;
        case "top":
            // content top => overlay strongest on top, fades down
            return `linear-gradient(180deg, ${strong} 0%, ${mid} 45%, ${soft} 75%, ${none} 100%)`;
        case "bottom":
            return `linear-gradient(0deg, ${strong} 0%, ${mid} 45%, ${soft} 75%, ${none} 100%)`;
        default:
            return `linear-gradient(270deg, ${strong} 0%, ${mid} 45%, ${soft} 75%, ${none} 100%)`;
    }
};

const imageBoxClassDesktop = (side: Placement) => {
    switch (side) {
        case "left":
            return "inset-y-0 left-0 md:w-[60%]";
        case "right":
            return "inset-y-0 right-0 md:w-[60%]";
        case "top":
            return "inset-x-0 top-0 md:h-[60%]";
        case "bottom":
            return "inset-x-0 bottom-0 md:h-[60%]";
        default:
            return "inset-y-0 right-0 md:w-[60%]";
    }
};

export const Offer: React.FC<OfferProps> = ({
    offer,
    className,
    imageSide,
    contentSide,
    badgePosition,
    ctaText = "Get Started",
    onCtaClick,
    size = "sm",
    imageObjectPosition = "right",
    badgeRotation = "",
    page = "business",
}) => {
    const componentHeight = page === "business" ? "h-full" : "min-h-[320px] sm:min-h-[380px] lg:min-h-[460px]";
    const base = offer.color || "#14146A";
    const rgb = hexToRgb(base);

    const badgeRotationClass = badgeRotation
        ? `rotate-[${badgeRotation}]`
        : "";

    const isLg = size === "lg";

    // mobile rule applied
    const mobileContentSide = toMobileTB(contentSide);
    const mobileImageSide = toMobileTB(imageSide);

    // ✅ overlay on IMAGE depends on where CONTENT is (per breakpoint)
    const imageOverlayMobile = imageOverlayByContent(mobileContentSide, rgb);
    const imageOverlayDesktop = imageOverlayByContent(contentSide, rgb);

    const objectPosClass =
        imageObjectPosition === "left"
            ? "object-left"
            : imageObjectPosition === "center"
                ? "object-center"
                : "object-right";

    // ✅ content positioning
    const contentOuterClass = clsx(
        "relative z-10 h-full flex justify-center",
        // mobile: top/bottom only
        mobileContentSide === "top" ? "items-start" : "items-end",
        // md+: real placement
        contentSide === "left" && "md:justify-start md:items-center",
        contentSide === "right" && "md:justify-end md:items-center",
        contentSide === "top" && "md:justify-center md:items-start",
        contentSide === "bottom" && "md:justify-center md:items-end"
    );

    const contentWidthClass =
        contentSide === "top" || contentSide === "bottom"
            ? "md:w-full md:max-w-4xl"
            : "md:w-[90%] lg:w-[70%]";

    const badgeOverlapPadding = clsx(
        badgePosition.includes("left") ? "md:pl-24" : "",
        badgePosition.includes("right") ? "md:pr-24" : ""
    );

    // ✅ image panel mobile (top/bottom only)
    const imageSideClassMobile =
        mobileImageSide === "top"
            ? "inset-x-0 top-0 h-[52%]"
            : "inset-x-0 bottom-0 h-[52%]";

    const imageSideClassDesktop = imageBoxClassDesktop(imageSide);

    return (
        <div
            className={clsx(
                "relative h-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] shadow-2xl",
                className
            )}
            style={{ backgroundColor: base }}
        >
            <div className={`relative ${componentHeight}`}>
                {/* ✅ Image panel - mobile */}
                <div className={clsx("absolute w-full md:hidden", imageSideClassMobile)}>
                    <div className="relative h-full w-full">
                        <Image
                            src={offer.img}
                            alt={offer.title}
                            fill
                            priority={false}
                            className={clsx("object-cover", objectPosClass)}
                            sizes="100vw"
                        />

                        {/* ✅ ONLY overlay now (on image) - direction follows content */}
                        <div className="absolute inset-0" style={{ background: imageOverlayMobile }} />
                    </div>
                </div>

                {/* ✅ Image panel - md+ */}
                <div className={clsx("absolute w-full hidden md:block", imageSideClassDesktop)}>
                    <div className="relative h-full w-full">
                        <Image
                            src={offer.img}
                            alt={offer.title}
                            fill
                            priority={false}
                            className={clsx("object-cover", objectPosClass)}
                            sizes="100vw"
                        />

                        {/* ✅ ONLY overlay now (on image) - direction follows content */}
                        <div className="absolute inset-0" style={{ background: imageOverlayDesktop }} />
                    </div>
                </div>

                {/* ✅ Content */}
                <div className={contentOuterClass}>
                    <div
                        className={clsx(
                            "w-full",
                            // page === "residential" ? "md:max-w-[90%]" : "max-w-[60%]",
                            contentWidthClass,
                            "px-4 sm:px-6 lg:px-8 py-20 sm:py-10 lg:py-12",
                            // badgeOverlapPadding
                        )}
                    >
                        <p className="text-section-subheading !text-white/75 !mb-0">
                            {offer.tagline}
                        </p>

                        <h3
                            className={clsx(
                                "mt-3 text-white font-bold leading-tight capitalize",
                                page === "residential" ? "text-h2"
                                    : size === "lg" ? "text-h3" : "text-h4"
                            )}
                        >
                            {offer.title}
                        </h3>

                        <div className="mt-2 grid md:grid-cols-2 items-stretch gap-2">
                            {(offer.features ?? []).slice(0, 4).map((f, i) => (
                                <div
                                    key={`${offer.id}-${i}`}
                                    className={clsx(
                                        "flex min-h-[34px] h-full items-center gap-2.5",
                                        "rounded-[5px] px-1.5 py-2",
                                        "bg-white/10 backdrop-blur-md"
                                    )}
                                >
                                    <span className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/10">
                                        <Check className={clsx("text-white",
                                            page === "residential" ? "h-3 w-3 m-[4px]" : "h-2.5 w-2.5 m-[2px]")} />
                                    </span>
                                    <span className={clsx("text-white/90 font-medium leading-snug capitalize ",
                                        page === "residential" ? "text-body" : "text-caption")}
                                    >
                                        {f.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-stack-md">
                            <button
                                type="button"
                                onClick={onCtaClick}
                                className={clsx(
                                    "inline-flex items-center gap-2",
                                    "rounded-xl px-5 py-3",
                                    "text-white text-button",
                                    "border border-white/25 bg-white/0",
                                    "transition-all duration-300",
                                    "hover:bg-white/10 hover:border-white/35"
                                )}
                            >
                                {ctaText}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Badge */}
                <div
                    className={clsx(
                        "absolute z-20",
                        badgeRotationClass,
                        badgePosClass(badgePosition),
                        "h-[86px] w-[86px] sm:h-[95px] sm:w-[95px]",
                        "rounded-full border-[1px] border-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                    )}
                >
                    <div className="relative h-full w-full rounded-full bg-white/0 backdrop-blur-xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex items-end gap-1">
                                <span className="text-white text-h3 font-extrabold leading-none">
                                    {offer.bandwidth}
                                </span>
                                <span className="text-white/90 text-overline pb-1.5">
                                    MBPS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/15" />
            </div>
        </div>
    );
};

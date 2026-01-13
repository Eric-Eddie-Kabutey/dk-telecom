"use client";

import React from "react";
import clsx from "clsx";

type CarouselProps = {
    children: React.ReactNode;
    autoPlay?: boolean;
    intervalMs?: number;
    pauseOnHover?: boolean;
    initialIndex?: number;

    showIndicators?: boolean;
    indicatorsClassName?: string;

    showArrows?: boolean;
    className?: string;
    slideClassName?: string;
};

export default function ComponentCarousel({
    children,
    autoPlay = true,
    intervalMs = 6000,
    pauseOnHover = true,
    initialIndex = 0,

    showIndicators = true,
    indicatorsClassName = "",

    showArrows = false,
    className = "",
    slideClassName = "",
}: CarouselProps) {
    const slides = React.Children.toArray(children);
    const count = slides.length;

    const [index, setIndex] = React.useState(() =>
        Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0))
    );
    const [isHovering, setIsHovering] = React.useState(false);

    // swipe handling
    const startXRef = React.useRef<number | null>(null);
    const deltaXRef = React.useRef<number>(0);

    const goTo = React.useCallback(
        (i: number) => {
            if (count === 0) return;
            const next = (i + count) % count;
            setIndex(next);
        },
        [count]
    );

    const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);

    // autoplay
    React.useEffect(() => {
        if (!autoPlay || count <= 1) return;
        if (pauseOnHover && isHovering) return;

        const t = window.setInterval(() => {
            setIndex((i) => (i + 1) % count);
        }, intervalMs);

        return () => window.clearInterval(t);
    }, [autoPlay, intervalMs, count, pauseOnHover, isHovering]);

    // keyboard navigation
    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [next, prev]);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        startXRef.current = e.clientX;
        deltaXRef.current = 0;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (startXRef.current == null) return;
        deltaXRef.current = e.clientX - startXRef.current;
    };

    const onPointerUp = () => {
        const dx = deltaXRef.current;
        startXRef.current = null;
        deltaXRef.current = 0;

        // swipe threshold
        if (Math.abs(dx) < 60) return;
        if (dx < 0) next();
        else prev();
    };

    return (
        <div
            className={clsx("w-full mb-10", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div
                className="relative overflow-hidden w-full"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                {/* Track */}
                <div
                    className={clsx(
                        "flex w-full will-change-transform",
                        "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    )}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            className={clsx("w-full shrink-0", slideClassName)}
                            aria-hidden={i !== index}
                        >
                            {slide}
                        </div>
                    ))}
                </div>

            </div>

            {/* Indicators */}
            {showIndicators && count > 1 && (
                <div
                    className={clsx(
                        "mt-1 flex items-center justify-center gap-2",
                        indicatorsClassName
                    )}
                >
                    {Array.from({ length: count }).map((_, i) => {
                        const active = i === index;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i)}
                                className={clsx(
                                    "h-2.5 rounded-full transition-all duration-300",
                                    active ? "w-8 bg-dark/90" : "w-2.5 bg-dark/30 hover:bg-dark/50"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={active ? "true" : "false"}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

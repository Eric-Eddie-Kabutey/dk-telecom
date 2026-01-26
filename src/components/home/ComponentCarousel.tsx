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

    showArrows = false, // (kept in props for later if you add arrows)
    className = "",
    slideClassName = "",
}: CarouselProps) {
    const slides = React.Children.toArray(children);
    const count = slides.length;

    const [index, setIndex] = React.useState(() =>
        Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0))
    );
    const [isHovering, setIsHovering] = React.useState(false);

    const goTo = React.useCallback(
        (i: number) => {
            if (count === 0) return;
            const nextIdx = (i + count) % count;
            setIndex(nextIdx);
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

    // swipe handling (pointer + touch)
    const startXRef = React.useRef<number | null>(null);
    const startYRef = React.useRef<number | null>(null);
    const deltaXRef = React.useRef<number>(0);

    const beginSwipe = (x: number, y: number) => {
        startXRef.current = x;
        startYRef.current = y;
        deltaXRef.current = 0;
    };

    const moveSwipe = (x: number, y: number) => {
        if (startXRef.current == null || startYRef.current == null) return;

        const dx = x - startXRef.current;
        const dy = y - startYRef.current;

        // Only consider it a swipe if it's more horizontal than vertical
        if (Math.abs(dx) > Math.abs(dy)) {
            deltaXRef.current = dx;
        }
    };

    const endSwipe = (threshold = 60) => {
        const dx = deltaXRef.current;

        startXRef.current = null;
        startYRef.current = null;
        deltaXRef.current = 0;

        if (Math.abs(dx) < threshold) return;

        // swipe left -> next, swipe right -> prev
        if (dx < 0) next();
        else prev();
    };

    // Pointer events (covers mouse/pen/touch in most browsers)
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        beginSwipe(e.clientX, e.clientY);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        moveSwipe(e.clientX, e.clientY);
    };

    const onPointerUp = () => endSwipe();

    // Touch fallback (helps on some mobile Safari edge cases)
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const t = e.touches[0];
        beginSwipe(t.clientX, t.clientY);
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const t = e.touches[0];
        moveSwipe(t.clientX, t.clientY);
    };

    const onTouchEnd = () => endSwipe();

    return (
        <div
            className={clsx("w-full mb-10", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div
                className="relative overflow-hidden w-full"
                style={{ touchAction: "pan-y" }} // ✅ allow horizontal swipe; keep vertical scroll
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Track */}
                <div
                    className={clsx(
                        "flex w-full will-change-transform pb-20",
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

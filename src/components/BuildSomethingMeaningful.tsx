"use client";

import React, { useMemo } from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { ThingCard } from "@/components/ThingCard";

type Thing = {
  id: number;
  title: string;
  body: string;
  type: "simple" | "detailed";
  img?: string;
  img2?: string;
};

type Props = {
  className?: string;
  id?: string;
};

export const BuildSomethingMeaningful: React.FC<Props> = ({
  className,
  id = "build-something-meaningful",
}) => {
  const { text } = useSiteMode();

  const data = text?.career?.buildingSomethingMeaningful as {
    title: string;
    subtitle: string;
    things: Thing[];
  };

  if (!data) return null;

  const things = data.things ?? [];

  // Row 1 = first two things (2 cards, 50/50 on desktop)
  const row1 = things.slice(0, 2);

  // Row 2 = next 3 things (simple + detailed + simple)
  const row2 = useMemo(() => {
    const rest = things.slice(2);
    const detailed = rest.find((t) => t.type === "detailed") ?? null;
    const simples = rest.filter((t) => t.type !== "detailed");

    return {
      left: simples[0] ?? null,
      middle: detailed,
      right: simples[1] ?? null,
      fallback: rest,
      isPerfect: Boolean(simples[0] && detailed && simples[1]),
    };
  }, [things]);

  return (
    <section id={id} className={clsx("w-full bg-gray-50 py-20", className)}>
      <div className="container ">
        <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm sm:text-base text-gray-600">
          {data.subtitle}
        </p>

        {/* ✅ 1 col mobile/tablet, 4 cols on desktop */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-6">
          {/* ROW 1 (50/50) */}
          {row1[0] && (
            <ThingCard thing={row1[0]} className="lg:col-span-3" />
          )}
          {row1[1] && (
            <ThingCard thing={row1[1]} className="lg:col-span-3" />
          )}

          {/* ROW 2 (1 / 2 / 1) */}
          {row2.isPerfect ? (
            <>
              {row2.left && (
                <ThingCard thing={row2.left} className="lg:col-span-2" />
              )}
              {row2.middle && (
                <ThingCard thing={row2.middle} className="lg:col-span-2" />
              )}
              {row2.right && (
                <ThingCard thing={row2.right} className="lg:col-span-2" />
              )}
            </>
          ) : (
            // fallback if the data isn't exactly 2 simple + 1 detailed
            row2.fallback.map((t) => <ThingCard key={t.id} thing={t} />)
          )}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";
import clsx from "clsx";

export const HowWeStandOut = () => {
  const { text } = useSiteMode();

  // Optional: use these if you want a small “tag” row like the screenshot
  const icons = [
    "/assets/resources/exceptional-customer-service-icon.svg",
    "/assets/resources/flexible-plans-for-ever-need-icon.svg",
    "/assets/resources/reliable-high-speed-connectivity-icon.svg",
  ];

  return (

    <section className="bg-gradient-to-b from-white via-gray-100 to-white section-py">
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-stack-lg max-w-3xl text-center">
          <div className="stack-sm">
            <h2 className="text-section-heading">
              {text.howWeStandOut.title}
            </h2>
            <p className="text-body text-gray-600">
              {text.howWeStandOut.subtitle}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 fluid-gap">
          {text.howWeStandOut.features.map((feature: any, idx: number) => {
            const title =
              `${feature.titleSection1 ?? ""} ${feature.titleSection2 ?? ""} ${feature.titleSection3 ?? ""}`.trim();

            return (
              <div
                key={idx}
                className={clsx("group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]",
                  idx === 0 && "md:-rotate-3 md:translate-y-3",
                  idx === 2 && "md:rotate-3 md:translate-y-3"
                )}
              >
                {/* Subtle background wash behind image (like the screenshot) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/70" />

                <div className="relative flex h-full flex-col">
                  {/* Title */}
                  <p className="text-card-title pt-6 sm:pt-8 px-4 text-center font-bold text-gray-900 capitalize">
                    {feature.titleSection1}{" "}
                    <span className="text-primary">{feature.titleSection2}</span>{" "}
                    {feature.titleSection3}
                  </p>

                  {/* Image area */}
                  <div className="relative mt-6 flex-1">
                    <div className="relative h-56 w-full sm:h-64 lg:h-72">
                      <Image
                        src={feature.img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useMemo } from "react";
import clsx from "clsx";
import { useSiteMode } from "@/context/SiteModeProvider";
import { ThingCard } from "@/components/career/ThingCard";
import { motion, Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
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

  const things = useMemo(() => data?.things ?? [], [data]);

  // Row 1 = first two things (2 cards, 50/50 on desktop)
  const row1 = useMemo(() => things.slice(0, 2), [things]);

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

  if (!data) return null;

  return (
    <section id={id} className={clsx("w-full bg-white section-py", className)}>
      <div className="container ">
        <div className="stack-sm">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto text-center text-section-heading !mb-0 capitalize"
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center text-body text-gray-600 capitalize"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* ✅ 1 col mobile/tablet, 4 cols on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-stack-lg grid grid-cols-1 fluid-gap lg:grid-cols-6"
        >
          {/* ROW 1 (50/50) */}
          {row1[0] && (
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <ThingCard thing={row1[0]} />
            </motion.div>
          )}
          {row1[1] && (
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <ThingCard thing={row1[1]} />
            </motion.div>
          )}

          {/* ROW 2 (1 / 2 / 1) */}
          {row2.isPerfect ? (
            <>
              {row2.left && (
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <ThingCard thing={row2.left} />
                </motion.div>
              )}
              {row2.middle && (
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <ThingCard thing={row2.middle} />
                </motion.div>
              )}
              {row2.right && (
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <ThingCard thing={row2.right} />
                </motion.div>
              )}
            </>
          ) : (
            // fallback if the data isn't exactly 2 simple + 1 detailed
            row2.fallback.map((t) => (
              <motion.div key={t.id} variants={itemVariants}>
                <ThingCard thing={t} />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

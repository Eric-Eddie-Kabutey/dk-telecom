"use client";

import Image from "next/image";
import { useSiteMode } from "@/context/SiteModeProvider";
import { splitTextInTwoLines } from "@/utils/utils";
import { useParams } from "next/navigation";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export const GetStarted = () => {
    const { mode: currentMode, text } = useSiteMode();
    const params = useParams();
    const modeFromUrl = params.mode as string;
    const isResidential = modeFromUrl === "residential";

    return (
        <section className="pt-20 bg-white">
            <div className="w-[80%] max-w-[1280px] mx-auto px-[3rem]">
                {isResidential && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-32"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{text.getStarted.title}</h2>
                    </motion.div>
                )}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-24"
                >
                    {text.getStarted.steps.map((step, idx) => {
                        const [t1, t2] = splitTextInTwoLines(step.title);
                        const [d1, d2] = splitTextInTwoLines(step.desc);

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="text-center group"
                            >
                                <div className="h-40 w-40 rounded-3xl bg-gray-900/5 flex items-center justify-center mx-auto mb-8">
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        width={64}
                                        height={64}
                                        className=" transition-all"
                                    />
                                </div>
                                <div className="mt-6 ">
                                    <h3 className="text-2xl font-semibold text-gray-900 px-[1rem] capitalize line-clamp-2">
                                        {t1}
                                        <br />
                                        {t2}
                                    </h3>


                                    {isResidential && (
                                        <p className="capitalize mt-3 text-lg text-gray-600 leading-relaxed line-clamp-2">
                                            {d1}
                                            <br />
                                            {d2}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    }
                    )}
                </motion.div>
            </div>

        </section>
    );
};

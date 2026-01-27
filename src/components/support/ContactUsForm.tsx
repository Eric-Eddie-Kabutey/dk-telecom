"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

type ContactFormValues = {
    fullName: string;
    email: string;
    message: string;
};

type ContactUsProps = {
    title?: string;
    subtitle?: string;
    note?: string;
    onSubmit?: (values: ContactFormValues) => Promise<void> | void;
};

export const ContactUsForm = ({
    title = "Contact Us",
    subtitle = "Send us a submission and we’ll reply as soon as possible.",
    note = "we can’t wait to hear from you",
    onSubmit,
}: ContactUsProps) => {
    const [values, setValues] = useState<ContactFormValues>({
        fullName: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const update =
        (key: keyof ContactFormValues) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setValues((prev) => ({ ...prev, [key]: e.target.value }));
                if (status !== "idle") setStatus("idle");
            };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setStatus("idle");

            // If you pass onSubmit, you can call your API here
            await onSubmit?.(values);

            // If no onSubmit, just simulate success
            if (!onSubmit) {
                await new Promise((r) => setTimeout(r, 600));
            }

            setStatus("success");
            setValues({ fullName: "", email: "", message: "" });
        } catch {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gray-50 section-py">
            <div className="container px-4">
                {/* Header */}
                <div className="max-w-2xl stack-sm">
                    <h1 className="text-section-heading !mb-0">
                        {title}
                    </h1>
                    <p className="text-body text-gray-600">{subtitle}</p>
                    <p className="text-body text-gray-600">{note}</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-stack-md"
                >
                    <div className="grid grid-cols-1 fluid-gap md:grid-cols-2">
                        {/* Full Name */}
                        <div className="stack-sm">
                            <label className="text-small font-bold text-gray-600 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                value={values.fullName}
                                onChange={update("fullName")}
                                placeholder="Type your name here"
                                className="h-12 w-full rounded-md bg-white px-4 text-sm text-dark border border-gray-200 transition focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="stack-sm">
                            <label className="text-small font-bold text-gray-600 uppercase tracking-wider">Email</label>
                            <input
                                value={values.email}
                                onChange={update("email")}
                                placeholder="sample@email.com"
                                type="email"
                                className="h-12 w-full rounded-md bg-white px-4 text-sm text-dark border border-gray-200 transition focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="stack-sm md:col-span-2">
                            <label className="text-small font-bold text-gray-600 uppercase tracking-wider">
                                How can we assist you?
                            </label>
                            <textarea
                                value={values.message}
                                onChange={update("message")}
                                placeholder="Enter your message here"
                                className="min-h-[180px] w-full resize-none rounded-md bg-white px-4 py-3 text-sm text-gray-900 outline-none transition sm:min-h-[220px]"
                                required
                            />
                        </div>
                    </div>

                    {/* Footer row */}
                    <div className="mt-stack-md flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-fit items-center gap-2 rounded-md border border-dark px-4 py-2 text-button text-gray-700 transition disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"} <ArrowRight size={18} />
                        </button>

                        {/* Tiny status text (optional) */}
                        {status === "success" && (
                            <p className="text-sm text-gray-600">✅ Sent. We got you.</p>
                        )}
                        {status === "error" && (
                            <p className="text-sm text-gray-600">
                                😵‍💫 Something went wrong. Try again.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useSiteMode } from "@/context/SiteModeProvider";
import { CareerDetail } from "@/components/career/CareerDetail";
import { findRoleBySlug } from "@/utils/slugify";

type Role = {
    id: number;
    unit: string;
    type: string;
    title: string;
    description: string;
    date: string;
};

export default function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { text } = useSiteMode();
    const { slug } = use(params);

    const openRoles = text?.career?.openRoles as {
        title: string;
        subtitle: string;
        roles: Role[];
    };

    const roles = openRoles?.roles ?? [];
    const role = findRoleBySlug(roles, slug);

    if (!role) {
        notFound();
    }

    return <CareerDetail role={role} />;
}

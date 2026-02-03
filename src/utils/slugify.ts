/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/&/g, '-and-')      // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}

/**
 * Find a role by its slug
 * @param roles - Array of roles
 * @param slug - The slug to search for
 * @returns The matching role or undefined
 */
export function findRoleBySlug<T extends { title: string }>(
    roles: T[],
    slug: string
): T | undefined {
    return roles.find((role) => slugify(role.title) === slug);
}

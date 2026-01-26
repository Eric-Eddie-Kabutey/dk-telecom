function splitTextInTwoLines(text = "") {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 1) return [text, ""]; // nothing to split

    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");

    return [line1, line2];
}

export { splitTextInTwoLines };

/**
 * Emoji mappings for expense categories
 */

export const CATEGORY_EMOJIS: Record<string, string> = {
  Food: "🍔",
  Transportation: "🚗",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Bills: "📄",
  Healthcare: "🏥",
  Education: "📚",
  Travel: "✈️",
  Personal: "💇",
  Other: "📦",
};

const EMOJI_REGEX = /^(\p{Extended_Pictographic}|\p{Emoji_Presentation})\s*/u;

export function getCategoryEmoji(category: string): string {
  if (!category) return "📊";
  const match = category.match(EMOJI_REGEX);
  if (match) {
    return match[1];
  }
  return CATEGORY_EMOJIS[category] || "📊";
}

export function getCategoryDisplayName(category: string): string {
  if (!category) return "";
  return category.replace(EMOJI_REGEX, "").trim() || category;
}

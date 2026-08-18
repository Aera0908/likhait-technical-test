import React, { useState } from "react";
import { TextField, Button } from "../vibes";
import { COLORS } from "../constants/colors";

interface CategoryFormProps {
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
}

const PRESET_EMOJIS = [
  "🏋️", "🎮", "🐶", "☕", "🍕", "💻", "🎵", "🚗", 
  "⚽", "🎨", "💡", "🛒", "🌿", "📚", "✈️", "💊", 
  "🏠", "👔", "🍿", "🎁", "💰", "🏖️", "🚲", "👶"
];

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🏷️");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      const fullName = selectedEmoji ? `${selectedEmoji} ${name.trim()}` : name.trim();
      await onSubmit(fullName);
    } catch (err: any) {
      setError(err.message || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLORS.secondary.s10, marginBottom: "8px" }}>
          Select Emoji Icon
        </label>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "6px",
          padding: "10px",
          background: COLORS.secondary.s01,
          borderRadius: "8px",
          border: `1px solid ${COLORS.secondary.s03}`,
          maxHeight: "130px",
          overflowY: "auto"
        }}>
          {PRESET_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              style={{
                fontSize: "20px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: selectedEmoji === emoji ? COLORS.primary.p02 : "white",
                border: selectedEmoji === emoji ? `2px solid ${COLORS.primary.p06}` : `1px solid ${COLORS.secondary.s03}`,
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <div style={{ width: "64px", flexShrink: 0 }}>
          <TextField
            label="Emoji"
            type="text"
            value={selectedEmoji}
            onChange={(e) => setSelectedEmoji(e.target.value)}
            fullWidth
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Category Name"
            type="text"
            placeholder="e.g. Fitness, Subscriptions"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            error={error}
            fullWidth
            required
          />
        </div>
      </div>

      {name.trim() && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 14px",
          background: COLORS.secondary.s01,
          borderRadius: "8px",
          border: `1px dashed ${COLORS.secondary.s04}`,
          fontSize: "14px",
          color: COLORS.secondary.s08
        }}>
          <span style={{ fontSize: "20px" }}>{selectedEmoji}</span>
          <span>Preview: <strong>{name.trim()}</strong></span>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
        <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
          {isSubmitting ? "Creating..." : "Add Category"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

"use client";

export type Palette = "cool" | "warm" | "noir";

interface PaletteToggleProps {
  value: Palette;
  onChange: (v: Palette) => void;
  visible?: boolean;
}

export function PaletteToggle({ value, onChange, visible = true }: PaletteToggleProps) {
  const opts: Array<{ value: Palette; label: string; swatch: [string, string] }> = [
    { value: "cool", label: "Cool", swatch: ["#8a93a0", "#181c24"] },
    { value: "warm", label: "Warm", swatch: ["#9a8a78", "#1f1813"] },
    { value: "noir", label: "Noir", swatch: ["#7a7d83", "#06080b"] },
  ];

  const sphere = (hi: string, lo: string) =>
    "radial-gradient(circle at 32% 28%, " + hi + " 0%, " + lo + " 78%)";

  return (
    <div
      className={"palette-toggle" + (visible ? "" : " hidden")}
      role="radiogroup"
      aria-label="Hero palette"
    >
      <span className="palette-toggle-label">Mood</span>
      <div className="palette-toggle-track">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            aria-label={o.label}
            title={o.label}
            className={"palette-toggle-opt" + (value === o.value ? " active" : "")}
            onClick={() => onChange(o.value)}
          >
            <span
              className="palette-toggle-swatch"
              style={{ background: sphere(o.swatch[0], o.swatch[1]) }}
            />
            <span className="palette-toggle-name">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

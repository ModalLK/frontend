export default function PriceRange({ value, onChange, min = 0, max = 50000 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Min: {value[0]}</span>
        <span>Max: {value[1]}</span>
      </div>

      {/* simple slider using 2 range inputs */}
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        className="w-full"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full"
      />

      <p className="text-xs text-slate-500">
        Tip: Keep min ≤ max (we auto-handle in Catalog).
      </p>
    </div>
  );
}

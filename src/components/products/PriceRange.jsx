export default function PriceRange({ value, onChange, min = 0, max = 50000 }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs font-medium text-black">
        <span>Min: Rs. {value[0]}</span>
        <span>Max: Rs. {value[1]}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        className="w-full accent-[#7a1fe0]"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full accent-[#7a1fe0]"
      />
    </div>
  );
}

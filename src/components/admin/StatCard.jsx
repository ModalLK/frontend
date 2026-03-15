export default function StatCard({ title, value, icon, change }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <span className="rounded-xl bg-[#f3e8ff] p-2 text-xl">{icon}</span>
        {change && (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
            {change}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-black text-slate-900">{value ?? "..."}</p>

    </div>
  );
}
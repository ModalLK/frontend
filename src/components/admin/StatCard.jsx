export default function StatCard({ title, value, icon, borderColor }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border-l-4 ${borderColor}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-black text-slate-800">{value ?? "..."}</p>
      </div>
    </div>
  );
}

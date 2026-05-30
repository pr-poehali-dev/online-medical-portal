import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const specialties = [
  { label: "Терапевт", icon: "Stethoscope", color: "text-cyan-600 bg-cyan-50" },
  { label: "Хирург", icon: "Scissors", color: "text-blue-600 bg-blue-50" },
  { label: "Кардиолог", icon: "Heart", color: "text-red-500 bg-red-50" },
  { label: "Невролог", icon: "Brain", color: "text-violet-600 bg-violet-50" },
  { label: "Офтальмолог", icon: "Eye", color: "text-teal-600 bg-teal-50" },
  { label: "Педиатр", icon: "Baby", color: "text-pink-500 bg-pink-50" },
  { label: "Гинеколог", icon: "HeartPulse", color: "text-rose-500 bg-rose-50" },
  { label: "Ортопед", icon: "Bone", color: "text-amber-600 bg-amber-50" },
  { label: "Дерматолог", icon: "Layers", color: "text-orange-500 bg-orange-50" },
  { label: "Психолог", icon: "SmilePlus", color: "text-indigo-600 bg-indigo-50" },
  { label: "Онколог", icon: "Microscope", color: "text-purple-600 bg-purple-50" },
  { label: "Все", icon: "LayoutGrid", color: "text-slate-600 bg-slate-100" },
];

export default function SpecialtiesBar() {
  return (
    <div className="bg-white border-b border-slate-100 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-3 min-w-max lg:min-w-0 lg:flex-wrap">
          {specialties.map((s) => (
            <Link
              key={s.label}
              to="/doctors"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap hover:shadow-md transition-all duration-200 card-hover border border-transparent hover:border-slate-200"
            >
              <span className={`p-1.5 rounded-lg ${s.color}`}>
                <Icon name={s.icon} size={14} fallback="Circle" />
              </span>
              <span className="text-slate-700">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
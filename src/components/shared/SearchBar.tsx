import Icon from "@/components/ui/icon";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  large?: boolean;
}

export default function SearchBar({ placeholder = "Найдите врача, клинику, услугу...", className = "", large = false }: SearchBarProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className={`flex items-center w-full bg-white rounded-2xl shadow-xl border border-white/60 overflow-hidden ${large ? "p-2" : "p-1.5"}`}>
        <div className={`flex items-center flex-1 gap-3 ${large ? "px-4 py-2" : "px-3 py-1.5"}`}>
          <Icon name="Search" size={large ? 22 : 18} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder={placeholder}
            className={`flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 ${large ? "text-base" : "text-sm"}`}
          />
        </div>
        <div className="hidden sm:flex items-center gap-2 pr-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors">
            <Icon name="MapPin" size={14} className="text-brand-cyan" />
            <span>Москва</span>
            <Icon name="ChevronDown" size={14} />
          </button>
        </div>
        <button className={`gradient-brand text-white font-semibold rounded-xl flex-shrink-0 flex items-center gap-2 transition-all hover:opacity-90 shadow-md ${large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}`}>
          <span className="hidden sm:inline">Найти</span>
          <Icon name="Search" size={large ? 18 : 15} className="sm:hidden" />
        </button>
      </div>
    </div>
  );
}

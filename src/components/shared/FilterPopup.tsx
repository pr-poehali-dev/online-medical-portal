import { useState } from "react";
import Icon from "@/components/ui/icon";

interface FilterOption {
  id: string;
  label: string;
  children?: FilterOption[];
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

const filterGroups: FilterGroup[] = [
  {
    id: "specialty",
    label: "Специальность",
    options: [
      { id: "therapist", label: "Терапевт" },
      { id: "cardiologist", label: "Кардиолог" },
      { id: "neurologist", label: "Невролог" },
      { id: "surgeon", label: "Хирург" },
      { id: "ophthalmologist", label: "Офтальмолог" },
      { id: "pediatrician", label: "Педиатр" },
    ]
  },
  {
    id: "district",
    label: "Район / Округ",
    options: [
      {
        id: "cao", label: "ЦАО", children: [
          { id: "arbat", label: "Арбат" },
          { id: "basmanniy", label: "Басманный" },
        ]
      },
      {
        id: "sao", label: "САО", children: [
          { id: "voykovsky", label: "Войковский" },
          { id: "hovrino", label: "Ховрино" },
        ]
      },
      {
        id: "vao", label: "ВАО", children: [
          { id: "balashiha", label: "Балашиха" },
          { id: "izmaylovo", label: "Измайлово" },
        ]
      },
    ]
  },
  {
    id: "price",
    label: "Цена приёма",
    options: [
      { id: "free", label: "Бесплатно (по полису ОМС)" },
      { id: "to1000", label: "До 1 000 ₽" },
      { id: "1000-2000", label: "1 000 — 2 000 ₽" },
      { id: "2000-5000", label: "2 000 — 5 000 ₽" },
      { id: "from5000", label: "От 5 000 ₽" },
    ]
  },
  {
    id: "experience",
    label: "Стаж",
    options: [
      { id: "3", label: "От 3 лет" },
      { id: "5", label: "От 5 лет" },
      { id: "10", label: "От 10 лет" },
      { id: "15", label: "От 15 лет" },
    ]
  },
  {
    id: "rating",
    label: "Рейтинг",
    options: [
      { id: "4", label: "От 4.0 ⭐" },
      { id: "4.5", label: "От 4.5 ⭐" },
      { id: "5", label: "Только 5.0 ⭐" },
    ]
  },
];

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPopup({ isOpen, onClose }: FilterPopupProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["specialty"]);
  const [expandedOptions, setExpandedOptions] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleOption = (id: string) => {
    setExpandedOptions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full sm:w-[560px] max-h-[85vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Фильтры</h3>
            {selected.length > 0 && (
              <span className="text-sm text-brand-cyan">{selected.length} выбрано</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {filterGroups.map((group) => (
            <div key={group.id} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-800">{group.label}</span>
                <Icon name={expandedGroups.includes(group.id) ? "ChevronUp" : "ChevronDown"} size={18} className="text-slate-400" />
              </button>

              {expandedGroups.includes(group.id) && (
                <div className="px-4 pb-3 space-y-1">
                  {group.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-3 flex-1 py-2 cursor-pointer hover:text-brand-cyan transition-colors">
                          <div
                            onClick={() => toggleSelect(opt.id)}
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                              selected.includes(opt.id)
                                ? "bg-brand-cyan border-brand-cyan"
                                : "border-slate-300"
                            }`}
                          >
                            {selected.includes(opt.id) && <Icon name="Check" size={12} className="text-white" />}
                          </div>
                          <span className="text-sm text-slate-700">{opt.label}</span>
                        </label>
                        {opt.children && (
                          <button onClick={() => toggleOption(opt.id)} className="p-1 text-slate-400 hover:text-brand-cyan">
                            <Icon name={expandedOptions.includes(opt.id) ? "ChevronUp" : "ChevronDown"} size={14} />
                          </button>
                        )}
                      </div>

                      {opt.children && expandedOptions.includes(opt.id) && (
                        <div className="ml-8 space-y-1">
                          {opt.children.map((child) => (
                            <label key={child.id} className="flex items-center gap-3 py-1.5 cursor-pointer">
                              <div
                                onClick={() => toggleSelect(child.id)}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                                  selected.includes(child.id)
                                    ? "bg-brand-cyan border-brand-cyan"
                                    : "border-slate-300"
                                }`}
                              >
                                {selected.includes(child.id) && <Icon name="Check" size={10} className="text-white" />}
                              </div>
                              <span className="text-sm text-slate-600">{child.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={() => setSelected([])}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Сбросить
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl gradient-brand text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all"
          >
            Показать результаты
          </button>
        </div>
      </div>
    </div>
  );
}

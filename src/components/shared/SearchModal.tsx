import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/ui/modal";
import Icon from "@/components/ui/icon";

/* ── Типы табов ───────────────────────────────────────────── */
const TABS = [
  { id: "doctors",      label: "Врачи",         icon: "Stethoscope" },
  { id: "specialties",  label: "Специальность",  icon: "BookOpen"    },
  { id: "metro",        label: "Метро",          icon: "Train"       },
  { id: "district",     label: "Округ",          icon: "Map"         },
  { id: "neighborhood", label: "Район",          icon: "MapPin"      },
  { id: "clinics",      label: "Клиники",        icon: "Building2"   },
  { id: "diagnostics",  label: "Диагностика",    icon: "ScanLine"    },
  { id: "services",     label: "Услуги",         icon: "LayoutGrid"  },
] as const;

type TabId = typeof TABS[number]["id"];

/* ── Подсказки по табам ───────────────────────────────────── */
const SUGGESTIONS: Record<TabId, { icon: string; label: string }[]> = {
  metro: [
    { icon: "Train", label: "Арбатская" },
    { icon: "Train", label: "Автозаводская" },
    { icon: "Train", label: "Белорусская" },
    { icon: "Train", label: "Войковская" },
    { icon: "Train", label: "Динамо" },
    { icon: "Train", label: "Добрынинская" },
    { icon: "Train", label: "Киевская" },
    { icon: "Train", label: "Китай-город" },
    { icon: "Train", label: "Красные Ворота" },
    { icon: "Train", label: "Кузнецкий мост" },
    { icon: "Train", label: "Лубянка" },
    { icon: "Train", label: "Новослободская" },
    { icon: "Train", label: "Октябрьская" },
    { icon: "Train", label: "Павелецкая" },
    { icon: "Train", label: "Парк культуры" },
    { icon: "Train", label: "Площадь революции" },
    { icon: "Train", label: "Пушкинская" },
    { icon: "Train", label: "Смоленская" },
    { icon: "Train", label: "Сокольники" },
    { icon: "Train", label: "Таганская" },
    { icon: "Train", label: "Театральная" },
    { icon: "Train", label: "Тверская" },
    { icon: "Train", label: "Третьяковская" },
    { icon: "Train", label: "Университет" },
    { icon: "Train", label: "Чистые пруды" },
    { icon: "Train", label: "Щербаковская" },
  ],
  neighborhood: [
    { icon: "MapPin", label: "Арбат" },
    { icon: "MapPin", label: "Басманный" },
    { icon: "MapPin", label: "Замоскворечье" },
    { icon: "MapPin", label: "Красносельский" },
    { icon: "MapPin", label: "Мещанский" },
    { icon: "MapPin", label: "Пресненский" },
    { icon: "MapPin", label: "Таганский" },
    { icon: "MapPin", label: "Тверской" },
    { icon: "MapPin", label: "Хамовники" },
    { icon: "MapPin", label: "Якиманка" },
    { icon: "MapPin", label: "Аэропорт" },
    { icon: "MapPin", label: "Беговой" },
    { icon: "MapPin", label: "Бескудниковский" },
    { icon: "MapPin", label: "Войковский" },
    { icon: "MapPin", label: "Головинский" },
    { icon: "MapPin", label: "Дмитровский" },
    { icon: "MapPin", label: "Коптево" },
    { icon: "MapPin", label: "Левобережный" },
    { icon: "MapPin", label: "Молжаниновский" },
    { icon: "MapPin", label: "Савёловский" },
    { icon: "MapPin", label: "Сокол" },
    { icon: "MapPin", label: "Тимирязевский" },
    { icon: "MapPin", label: "Ховрино" },
    { icon: "MapPin", label: "Алексеевский" },
    { icon: "MapPin", label: "Бабушкинский" },
    { icon: "MapPin", label: "Бутырский" },
    { icon: "MapPin", label: "Лосиноостровский" },
    { icon: "MapPin", label: "Марфино" },
    { icon: "MapPin", label: "Марьина роща" },
    { icon: "MapPin", label: "Останкинский" },
    { icon: "MapPin", label: "Отрадное" },
    { icon: "MapPin", label: "Ростокино" },
    { icon: "MapPin", label: "Свиблово" },
    { icon: "MapPin", label: "Северное Медведково" },
    { icon: "MapPin", label: "Южное Медведково" },
    { icon: "MapPin", label: "Богородское" },
    { icon: "MapPin", label: "Вешняки" },
    { icon: "MapPin", label: "Гольяново" },
    { icon: "MapPin", label: "Ивановское" },
    { icon: "MapPin", label: "Косино-Ухтомский" },
    { icon: "MapPin", label: "Метрогородок" },
    { icon: "MapPin", label: "Новогиреево" },
    { icon: "MapPin", label: "Перово" },
    { icon: "MapPin", label: "Преображенское" },
    { icon: "MapPin", label: "Соколиная гора" },
    { icon: "MapPin", label: "Сокольники" },
    { icon: "MapPin", label: "Измайлово" },
    { icon: "MapPin", label: "Балашиха (МО)" },
    { icon: "MapPin", label: "Железнодорожный (МО)" },
    { icon: "MapPin", label: "Реутов (МО)" },
    { icon: "MapPin", label: "Люберцы (МО)" },
    { icon: "MapPin", label: "Химки (МО)" },
    { icon: "MapPin", label: "Мытищи (МО)" },
    { icon: "MapPin", label: "Одинцово (МО)" },
    { icon: "MapPin", label: "Красногорск (МО)" },
  ],
  district: [
    { icon: "Map", label: "Центральный округ (ЦАО)" },
    { icon: "Map", label: "Северный округ (САО)" },
    { icon: "Map", label: "Северо-Восточный округ (СВАО)" },
    { icon: "Map", label: "Восточный округ (ВАО)" },
    { icon: "Map", label: "Юго-Восточный округ (ЮВАО)" },
    { icon: "Map", label: "Южный округ (ЮАО)" },
    { icon: "Map", label: "Юго-Западный округ (ЮЗАО)" },
    { icon: "Map", label: "Западный округ (ЗАО)" },
    { icon: "Map", label: "Северо-Западный округ (СЗАО)" },
    { icon: "Map", label: "Зеленоградский округ (ЗелАО)" },
    { icon: "Map", label: "Троицкий округ (ТАО)" },
    { icon: "Map", label: "Новомосковский округ (НАО)" },
  ],
  specialties: [
    { icon: "Stethoscope", label: "Терапевт" },
    { icon: "Heart",       label: "Кардиолог" },
    { icon: "Brain",       label: "Невролог" },
    { icon: "Eye",         label: "Офтальмолог" },
    { icon: "Baby",        label: "Педиатр" },
    { icon: "HeartPulse",  label: "Гинеколог" },
    { icon: "Bone",        label: "Ортопед" },
    { icon: "Layers",      label: "Дерматолог" },
    { icon: "SmilePlus",   label: "Психолог" },
    { icon: "Scissors",    label: "Хирург" },
    { icon: "Droplets",    label: "Уролог" },
    { icon: "Activity",    label: "Эндокринолог" },
  ],
  doctors: [
    { icon: "Stethoscope", label: "Терапевт" },
    { icon: "Heart",       label: "Кардиолог" },
    { icon: "Brain",       label: "Невролог" },
    { icon: "Eye",         label: "Офтальмолог" },
    { icon: "Baby",        label: "Педиатр" },
    { icon: "Bone",        label: "Ортопед" },
    { icon: "Layers",      label: "Дерматолог" },
    { icon: "SmilePlus",   label: "Психолог" },
  ],
  clinics: [
    { icon: "Building2",   label: "Многопрофильная клиника" },
    { icon: "Heart",       label: "Кардиологический центр" },
    { icon: "Baby",        label: "Детская клиника" },
    { icon: "Smile",       label: "Стоматология" },
    { icon: "Eye",         label: "Офтальмологическая клиника" },
    { icon: "Brain",       label: "Неврологический центр" },
  ],
  diagnostics: [
    { icon: "ScanLine",    label: "МРТ" },
    { icon: "Activity",    label: "УЗИ" },
    { icon: "Zap",         label: "КТ" },
    { icon: "FlaskConical",label: "Анализы крови" },
    { icon: "Heart",       label: "ЭКГ" },
    { icon: "Eye",         label: "Офтальмодиагностика" },
  ],
  services: [
    { icon: "Home",        label: "Вызов врача на дом" },
    { icon: "Video",       label: "Телемедицина" },
    { icon: "Syringe",     label: "Вакцинация" },
    { icon: "FlaskConical",label: "Анализы на дому" },
    { icon: "Brain",       label: "Психотерапия" },
    { icon: "Activity",    label: "Реабилитация" },
  ],
};

const PLACEHOLDERS: Record<TabId, string> = {
  doctors:     "Введите специальность или имя врача...",
  specialties: "Введите специальность...",
  metro:        "Введите название станции метро...",
  district:     "Введите название округа...",
  neighborhood: "Введите название района...",
  clinics:     "Название клиники или специализация...",
  diagnostics: "МРТ, УЗИ, КТ, анализы...",
  services:    "Название услуги...",
};

const HREFS: Record<TabId, string> = {
  doctors:     "/doctors",
  specialties: "/doctors",
  metro:        "/doctors",
  district:     "/doctors",
  neighborhood: "/doctors",
  clinics:     "/clinics",
  diagnostics: "/diagnostics",
  services:    "/services",
};

/* ── Recent searches (mock) ───────────────────────────────── */
const RECENT = ["Кардиолог рядом", "МРТ головного мозга", "Детский педиатр"];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function SearchModal({ isOpen, onClose, initialQuery = "" }: SearchModalProps) {
  const [tab, setTab] = useState<TabId>("doctors");
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (q?: string) => {
    const search = (q ?? query).trim();
    const href = HREFS[tab] + (search ? `?q=${encodeURIComponent(search)}` : "");
    onClose();
    navigate(href);
  };

  const suggestions = SUGGESTIONS[tab];
  const filtered = query.trim()
    ? suggestions.filter(s => s.label.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      {/* Input row */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200 focus-within:border-brand-cyan focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
          <Icon name="Search" size={18} className="text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder={PLACEHOLDERS[tab]}
            className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm min-w-0"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-3 overflow-x-auto scrollbar-none pb-0.5">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-brand-cyan text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <Icon name={t.icon as Parameters<typeof Icon>[0]["name"]} size={12} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4" style={{ minHeight: 260 }}>

        {/* Recent — только когда нет запроса */}
        {!query && (
          <div className="mb-4">
            <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Недавние запросы</div>
            <div className="flex flex-wrap gap-2">
              {RECENT.map(r => (
                <button
                  key={r}
                  onClick={() => handleSearch(r)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-brand-cyan text-slate-600 text-xs transition-all border border-transparent hover:border-cyan-200"
                >
                  <Icon name="Clock" size={12} className="flex-shrink-0" />
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">
            {query ? "Результаты" : `Популярные в разделе "${TABS.find(t => t.id === tab)?.label}"`}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-25" />
              <div className="text-sm">Ничего не найдено</div>
              <div className="text-xs mt-1">Попробуйте изменить запрос</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5">
              {filtered.map(s => (
                <button
                  key={s.label}
                  onClick={() => handleSearch(s.label)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left hover:bg-cyan-50 hover:text-brand-cyan text-slate-700 text-sm transition-all border border-transparent hover:border-cyan-100 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-cyan-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={14} className="text-slate-400 group-hover:text-brand-cyan transition-colors" />
                  </div>
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 flex gap-2">
        <button
          onClick={() => handleSearch()}
          className="flex-1 py-2.5 rounded-xl gradient-brand text-white text-sm font-bold shadow hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <Icon name="Search" size={15} />
          Найти
          {query && <span className="font-normal opacity-80 truncate max-w-[140px]">«{query}»</span>}
        </button>
      </div>
    </Modal>
  );
}
import { useState, useMemo, useEffect } from "react";
import Modal from "@/components/ui/modal";
import Icon from "@/components/ui/icon";

const POPULAR_CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Краснодар", "Самара", "Уфа", "Ростов-на-Дону",
];

const ALL_CITIES = [
  ...POPULAR_CITIES,
  "Воронеж", "Пермь", "Волгоград", "Красноярск", "Саратов",
  "Тюмень", "Тольятти", "Ижевск", "Барнаул", "Ульяновск",
  "Хабаровск", "Иркутск", "Владивосток", "Ярославль", "Махачкала",
  "Томск", "Оренбург", "Кемерово", "Новокузнецк", "Рязань",
];

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelect: (city: string) => void;
}

export default function CityModal({ isOpen, onClose, currentCity, onSelect }: CityModalProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return ALL_CITIES.filter(c => c.toLowerCase().includes(q));
  }, [search]);

  const handleSelect = (city: string) => {
    onSelect(city);
    setSearch("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { setSearch(""); onClose(); }}
      title="Выберите город"
      subtitle="Найдём врачей и клиники рядом с вами"
      size="sm"
    >
      {loading ? (
        <div className="px-6 pt-5 pb-6">
          {/* Search skeleton */}
          <div className="h-10 rounded-xl bg-slate-100 animate-pulse mb-5" />

          {/* Current city skeleton */}
          <div className="mb-4">
            <div className="h-3 w-28 rounded bg-slate-100 animate-pulse mb-2" />
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-slate-200 animate-pulse flex-shrink-0" />
              <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
              <div className="w-4 h-4 rounded bg-slate-200 animate-pulse ml-auto" />
            </div>
          </div>

          {/* Detect skeleton */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 mb-5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 animate-pulse flex-shrink-0" />
            <div className="h-4 w-40 rounded bg-slate-100 animate-pulse" />
          </div>

          {/* Popular skeleton */}
          <div>
            <div className="h-3 w-32 rounded bg-slate-100 animate-pulse mb-3" />
            <div className="space-y-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                  <div className="w-4 h-4 rounded bg-slate-100 animate-pulse flex-shrink-0" style={{ animationDelay: `${i * 80}ms` }} />
                  <div
                    className="h-4 rounded bg-slate-100 animate-pulse"
                    style={{ width: `${55 + (i % 4) * 15}px`, animationDelay: `${i * 80}ms` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Loading label */}
          <div className="flex items-center justify-center gap-2 mt-5 text-slate-400">
            <div className="flex gap-1">
              {[0,1,2].map(d => (
                <div
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60 animate-bounce"
                  style={{ animationDelay: `${d * 150}ms` }}
                />
              ))}
            </div>
            <span className="text-xs">Загружаем список городов...</span>
          </div>
        </div>
      ) : (
      <div className="px-6 pt-4 pb-6">

        {/* Search */}
        <div className="relative mb-5">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Начните вводить название города..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-cyan-100 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Search results */}
        {filtered !== null ? (
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Icon name="MapPin" size={32} className="mx-auto mb-2 opacity-25" />
                <div className="text-sm">Город не найден</div>
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map(city => (
                  <CityRow key={city} city={city} current={currentCity} onSelect={handleSelect} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Current city */}
            {currentCity && (
              <div className="mb-4">
                <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Текущий город</div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-cyan-50 border border-cyan-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-cyan/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={14} className="text-brand-cyan" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{currentCity}</span>
                  <Icon name="Check" size={15} className="text-brand-cyan ml-auto" />
                </div>
              </div>
            )}

            {/* Detect */}
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-dashed border-slate-200 hover:border-brand-cyan hover:bg-cyan-50/40 transition-all mb-5 group">
              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-cyan-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon name="Locate" size={14} className="text-slate-500 group-hover:text-brand-cyan transition-colors" />
              </div>
              <span className="text-sm text-slate-600 group-hover:text-brand-cyan transition-colors">Определить автоматически</span>
            </button>

            {/* Popular */}
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Популярные города</div>
              <div className="space-y-1">
                {POPULAR_CITIES.map(city => (
                  <CityRow key={city} city={city} current={currentCity} onSelect={handleSelect} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      )}
    </Modal>
  );
}

function CityRow({ city, current, onSelect }: { city: string; current: string; onSelect: (c: string) => void }) {
  const isActive = city === current;
  return (
    <button
      onClick={() => onSelect(city)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
        isActive
          ? "bg-cyan-50 text-brand-cyan"
          : "hover:bg-slate-50 text-slate-700"
      }`}
    >
      <Icon name="MapPin" size={14} className={isActive ? "text-brand-cyan" : "text-slate-400"} />
      <span className="text-sm flex-1">{city}</span>
      {isActive && <Icon name="Check" size={14} className="text-brand-cyan" />}
    </button>
  );
}
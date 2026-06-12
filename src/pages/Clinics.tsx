import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FilterPopup from "@/components/shared/FilterPopup";
import Icon from "@/components/ui/icon";
import { clinics } from "@/data/mockData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={12} className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

function ClinicCard({ clinic, onClick }: { clinic: typeof clinics[0]; onClick: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover cursor-pointer" onClick={onClick}>
      <div className="h-1.5 gradient-brand" />
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-5">
          {/* Лого + рейтинг */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-4xl shadow-sm">
              {clinic.logo}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-0.5">
                <StarRating rating={clinic.rating} />
                <span className="font-bold text-slate-900 text-sm">{clinic.rating}</span>
              </div>
              <div className="text-xs text-slate-400">{clinic.reviews} отзывов</div>
            </div>
          </div>

          {/* Основная инфо */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 flex-wrap">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight mb-1">{clinic.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Icon name="MapPin" size={13} className="text-brand-cyan flex-shrink-0" />
                  <span>{clinic.address}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">М</span>
                  {clinic.metro.map((m, i) => (
                    <span key={m} className="text-sm text-slate-600">
                      {m}{i < clinic.metro.length - 1 && <span className="text-slate-300 ml-1.5">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-3">{clinic.description}</p>

            {/* Теги услуг */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {clinic.services.map(s => (
                <span key={s} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100">{s}</span>
              ))}
            </div>

            {/* Статы */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl mb-3 text-sm">
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Врачей</div>
                <div className="font-semibold text-slate-800">{clinic.doctors}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Цены</div>
                <div className="font-semibold text-slate-800">{clinic.price}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Телефон</div>
                <div className="font-semibold text-slate-800 text-xs">{clinic.phone}</div>
              </div>
            </div>

            {/* Нижняя строка */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap gap-1.5">
                {clinic.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <Icon name="Check" size={10} />
                    {t}
                  </span>
                ))}
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Icon name="Clock" size={11} className="text-brand-cyan" />
                  {clinic.schedule}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="gradient-brand text-white font-semibold py-2 px-5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md">
                  Записаться
                </button>
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm hover:border-brand-cyan transition-all">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const QUICK_FILTERS = ["ОМС", "ДМС", "С парковкой", "Рядом с метро", "Рейтинг 4.5+"];

export default function ClinicsPage() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const allClinics = [...clinics, ...clinics, ...clinics].slice(0, 9);

  const toggleFilter = (f: string) =>
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const filtered = allClinics.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase()) ||
    c.metro.some(m => m.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero-баннер с поиском */}
      <section className="hero-bg py-10 md:py-14 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-3 leading-tight">
              Клиники в <span className="text-cyan-200">Москве</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              680+ клиник · онлайн-запись · реальные отзывы
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Название клиники, адрес или метро..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-white shadow-lg border-0 outline-none focus:ring-2 focus:ring-brand-cyan/40"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["Центр", "Рядом с метро", "Онлайн-запись", "Детская", "Стоматология"].map(s => (
                <button
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: "Клиники" }]} />

        {/* Фильтр-бар */}
        <div className="flex items-center gap-3 mt-5 mb-6 flex-wrap">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
          </button>
          {QUICK_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                activeFilters.includes(f)
                  ? "border-brand-cyan bg-cyan-50 text-brand-cyan font-semibold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-500">
            Найдено: <span className="font-semibold text-slate-800">{filtered.length} клиник</span>
          </div>
        </div>

        {/* Список клиник — одна в строку */}
        <div className="flex flex-col gap-4">
          {filtered.map((c, i) => <ClinicCard key={i} clinic={c} onClick={() => navigate(`/clinics/${c.id}`)} />)}
        </div>
      </div>

      <FilterPopup isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <Footer />
    </div>
  );
}
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import SpecialtiesBar from "@/components/shared/SpecialtiesBar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FilterPopup from "@/components/shared/FilterPopup";
import Icon from "@/components/ui/icon";

const centers = [
  {
    id: 1, name: "МРТ-Эксперт", logo: "🔬", address: "Ленинградский пр-т, 32", metro: "Сокол",
    rating: 4.9, reviews: 1890, services: ["МРТ", "КТ", "ПЭТ-КТ", "Рентген"], schedule: "Пн-Вс 8:00–23:00",
    phone: "+7 (495) 111-22-33", price: "от 3 500 ₽", description: "Ведущий центр МРТ-диагностики с новейшим оборудованием 3 Тесла и опытными рентгенологами.",
    tags: ["ДМС", "МРТ 24/7", "Онлайн-запись"], experts: 12,
  },
  {
    id: 2, name: "УЗИ-Центр Плюс", logo: "📡", address: "ул. Профсоюзная, 57", metro: "Академическая",
    rating: 4.7, reviews: 1120, services: ["УЗИ", "ЭКГ", "ЭхоКГ", "Допплер"], schedule: "Пн-Сб 8:00–21:00",
    phone: "+7 (495) 444-55-66", price: "от 1 200 ₽", description: "Специализированный центр ультразвуковой диагностики для взрослых и детей.",
    tags: ["ОМС", "ДМС", "Онлайн-запись"], experts: 8,
  },
  {
    id: 3, name: "Лаборатория Гемотест", logo: "🧪", address: "ул. Арбат, 22", metro: "Смоленская",
    rating: 4.8, reviews: 2340, services: ["Анализы крови", "Биохимия", "Гормоны", "ПЦР-тесты"], schedule: "Пн-Вс 7:00–22:00",
    phone: "+7 (495) 777-88-99", price: "от 250 ₽", description: "Современная лаборатория с широким спектром анализов. Результаты онлайн в течение 1–3 рабочих дней.",
    tags: ["ОМС", "ДМС", "Результаты онлайн"], experts: 15,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={12} className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

export default function DiagnosticCentersPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const allCenters = [...centers, ...centers, ...centers].slice(0, 9);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <SpecialtiesBar />

      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: "Диагностические центры" }]} />

        <div className="mt-6 mb-4">
          <h1 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-3">Диагностические центры Москвы</h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            Найдите лучший диагностический центр для прохождения МРТ, КТ, УЗИ и лабораторных исследований. Сравните цены, расписание и отзывы пациентов, чтобы выбрать оптимальный вариант в вашем районе.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
          </button>
          {["МРТ", "КТ", "УЗИ", "Анализы", "Рейтинг 4.5+"].map(f => (
            <button key={f} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm hover:border-brand-cyan hover:text-brand-cyan transition-all">
              {f}
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-500">Найдено: <span className="font-semibold text-slate-800">248 центров</span></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {allCenters.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
              <div className="h-2 gradient-teal" />
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                    {c.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-1">{c.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <Icon name="MapPin" size={11} className="text-teal-500" />
                      <span className="truncate">{c.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[8px]">М</span>
                      <span className="text-xs text-slate-500">{c.metro}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <StarRating rating={c.rating} />
                      <span className="font-bold text-sm">{c.rating}</span>
                    </div>
                    <div className="text-xs text-slate-400">{c.reviews}</div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3">{c.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.services.map(s => (
                    <span key={s} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg">{s}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl mb-3 text-xs">
                  <div>
                    <div className="text-slate-400 mb-0.5">Специалистов</div>
                    <div className="font-semibold text-slate-800">{c.experts}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-0.5">Цены</div>
                    <div className="font-semibold text-slate-800">{c.price}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags.map(t => (
                    <span key={t} className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">{t}</span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                  <Icon name="Clock" size={11} className="text-teal-500" />
                  {c.schedule}
                </div>
                <button className="w-full gradient-teal text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md">
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilterPopup isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <Footer />
    </div>
  );
}

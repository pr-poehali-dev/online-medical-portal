import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import SpecialtiesBar from "@/components/shared/SpecialtiesBar";
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

function ClinicCard({ clinic }: { clinic: typeof clinics[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      <div className="h-2 gradient-brand" />
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
            {clinic.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">{clinic.name}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <Icon name="MapPin" size={13} className="text-brand-cyan flex-shrink-0" />
              <span className="truncate">{clinic.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">М</span>
              <span className="text-sm text-slate-600">{clinic.metro}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 justify-end mb-0.5">
              <StarRating rating={clinic.rating} />
              <span className="font-bold text-slate-900 text-sm">{clinic.rating}</span>
            </div>
            <div className="text-xs text-slate-400">{clinic.reviews} отзывов</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">{clinic.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {clinic.services.map(s => (
            <span key={s} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100">{s}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl mb-4 text-sm">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Врачей</div>
            <div className="font-semibold text-slate-800">{clinic.doctors} специалистов</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Цены</div>
            <div className="font-semibold text-slate-800">{clinic.price}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Телефон</div>
            <div className="font-semibold text-slate-800">{clinic.phone}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {clinic.tags.map(t => (
            <span key={t} className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <Icon name="Check" size={10} />
              {t}
            </span>
          ))}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
          <Icon name="Clock" size={12} className="text-brand-cyan" />
          {clinic.schedule}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 gradient-brand text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md">
            Записаться
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm hover:border-brand-cyan transition-all">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClinicsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const allClinics = [...clinics, ...clinics, ...clinics].slice(0, 9);

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
        <Breadcrumbs items={[{ label: "Клиники" }]} />

        <div className="mt-6 mb-4">
          <h1 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-3">Медицинские клиники Москвы</h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            Каталог медицинских клиник Москвы с реальными отзывами, рейтингами и ценами. Сравните клиники по расположению, спектру услуг и стоимости приёма, чтобы выбрать лучший вариант для вашей ситуации.
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
          {["ОМС", "ДМС", "С парковкой", "Рядом с метро", "Рейтинг 4.5+"].map(f => (
            <button key={f} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm hover:border-brand-cyan hover:text-brand-cyan transition-all">
              {f}
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-500">Найдено: <span className="font-semibold text-slate-800">680 клиник</span></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {allClinics.map((c, i) => <ClinicCard key={i} clinic={c} />)}
        </div>
      </div>

      <FilterPopup isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <Footer />
    </div>
  );
}

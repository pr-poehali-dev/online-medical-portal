import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FilterPopup from "@/components/shared/FilterPopup";
import Icon from "@/components/ui/icon";
import { doctors, reviews } from "@/data/mockData";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={size} className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

function DoctorCard({ doctor }: { doctor: typeof doctors[0] }) {
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 gradient-brand rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 justify-center">
              <StarRating rating={doctor.rating} size={12} />
            </div>
            <div className="text-center text-xs text-slate-500 mt-0.5">{doctor.reviews} отзывов</div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {doctor.specialties.map(s => (
                <span key={s} className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-lg font-medium">{s}</span>
              ))}
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">{doctor.name}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-3">
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={13} className="text-brand-cyan" />
                Стаж {doctor.experience} лет
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Award" size={13} className="text-brand-cyan" />
                {doctor.category}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Phone" size={13} className="text-brand-cyan" />
                {doctor.phone}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{doctor.description}</p>
            <div className="flex items-center gap-3">
              <div className="text-xl font-heading font-black text-slate-900">{doctor.price.toLocaleString()} ₽</div>
              <div className="text-xs text-slate-400">за приём</div>
            </div>
          </div>
        </div>

        {/* Online Schedule */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-800">Онлайн-расписание</span>
          </div>

          {/* Clinic Select */}
          <div className="mb-3">
            <label className="text-xs text-slate-500 mb-1.5 block">Клиника</label>
            <div className="flex flex-wrap gap-2">
              {doctor.clinics.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClinic(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    selectedClinic === i
                      ? "gradient-brand text-white border-transparent shadow-md"
                      : "border-slate-200 text-slate-700 hover:border-brand-cyan"
                  }`}
                >
                  <Icon name="Building2" size={11} />
                  {c.name}
                  <span className={`${selectedClinic === i ? "text-white/70" : "text-slate-400"}`}>
                    · м. {c.metro}
                  </span>
                </button>
              ))}
            </div>
            {/* Metro */}
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">М</span>
              <span>{doctor.clinics[selectedClinic].metro}</span>
              <span className="text-slate-300">·</span>
              <span>{doctor.clinics[selectedClinic].name}</span>
            </div>
          </div>

          {/* Dates */}
          <div className="mb-3">
            <label className="text-xs text-slate-500 mb-1.5 block">Дата</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {doctor.dates.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    selectedDate === i
                      ? "gradient-brand text-white border-transparent shadow-sm"
                      : "border-slate-200 text-slate-700 hover:border-brand-cyan"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Время</label>
            <div className="flex flex-wrap gap-2">
              {doctor.clinics[selectedClinic].slots.map((slot) => (
                <button
                  key={slot}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-cyan-200 text-cyan-700 bg-cyan-50 hover:gradient-brand hover:text-white hover:border-transparent transition-all"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const allReviews = [...reviews, ...reviews].slice(0, 14);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: "Врачи" }]} />

        <div className="mt-6 mb-4">
          <h1 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-3">Врачи в Москве</h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            На нашем портале представлено более 3 200 опытных врачей различных специальностей. Вы можете выбрать специалиста по рейтингу, стажу, цене приёма и расположению клиники. Онлайн-запись доступна круглосуточно.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all"
          >
            <Icon name="SlidersHorizontal" size={16} />
            Фильтры
          </button>
          {["Терапевты", "Кардиологи", "Неврологи", "До 2000 ₽", "Рейтинг 4.5+"].map(f => (
            <button key={f} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm hover:border-brand-cyan hover:text-brand-cyan transition-all">
              {f}
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-500">Найдено: <span className="font-semibold text-slate-800">3 214 врачей</span></div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-5 mb-12">
          {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>

        {/* Reviews Block */}
        <div className="mb-8">
          <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900 mb-6">Последние отзывы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allReviews.slice(0, 14).map((r, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-hover">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={r.avatar} alt={r.author} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-semibold text-xs text-slate-900">{r.author}</div>
                    <div className="text-xs text-slate-400">{r.date}</div>
                  </div>
                </div>
                <StarRating rating={r.rating} size={11} />
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">"{r.text}"</p>
                <div className="text-xs text-brand-cyan mt-2 font-medium truncate">{r.doctor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FilterPopup isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <Footer />
    </div>
  );
}
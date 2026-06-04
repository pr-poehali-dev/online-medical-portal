import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row">

        {/* LEFT: Doctor Info */}
        <div className="flex-1 p-5 md:p-6 cursor-pointer" onClick={() => navigate(`/doctors/${doctor.id}`)}>
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
        </div>

        {/* RIGHT: Online Schedule */}
        <div className="lg:w-72 xl:w-80 bg-gradient-to-b from-slate-50 to-cyan-50/40 border-t lg:border-t-0 lg:border-l border-slate-100 p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-800">Онлайн-расписание</span>
          </div>

          {/* Clinic List */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2 block">Клиника</label>
            <div className="space-y-1.5">
              {doctor.clinics.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClinic(i)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl text-xs transition-all border ${
                    selectedClinic === i
                      ? "bg-white border-brand-cyan shadow-sm"
                      : "border-transparent hover:bg-white hover:border-slate-200"
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    selectedClinic === i ? "border-brand-cyan" : "border-slate-300"
                  }`}>
                    {selectedClinic === i && <div className="w-2 h-2 rounded-full bg-brand-cyan" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 truncate">{c.name}</div>
                    <div className="flex items-center gap-1 mt-0.5 text-slate-400">
                      <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0">М</span>
                      <span className="truncate">{c.metro}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2 block">Дата</label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {doctor.dates.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedDate === i
                      ? "gradient-brand text-white border-transparent shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-cyan"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2 block">Время</label>
            <div className="flex flex-wrap gap-1.5">
              {doctor.clinics[selectedClinic].slots.map((slot) => (
                <button
                  key={slot}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-cyan-200 text-cyan-700 bg-white hover:bg-brand-cyan hover:text-white hover:border-transparent transition-all"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Book button */}
          <button className="mt-auto w-full gradient-brand text-white font-semibold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md">
            Записаться на приём
          </button>
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

      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-700 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 5% 50%, rgba(255,255,255,0.10) 0, transparent 45%), radial-gradient(circle at 95% 20%, rgba(255,255,255,0.08) 0, transparent 40%), radial-gradient(circle at 60% 100%, rgba(16,185,129,0.18) 0, transparent 40%)"
        }} />

        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">

            {/* Text block */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Онлайн-запись доступна 24/7
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3">
                Более 3 200 врачей<br className="hidden sm:block" /> готовы принять вас<br className="hidden sm:block" />
                <span className="text-cyan-200">сегодня</span>
              </h2>
              <p className="text-white/75 text-sm md:text-base mb-5 max-w-md leading-relaxed">
                Запись без очередей, реальные отзывы пациентов и лучшие специалисты Москвы — всё в одном месте.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-5">
                {[
                  { value: "3 200+", label: "врачей" },
                  { value: "18 500+", label: "отзывов" },
                  { value: "680+", label: "клиник" },
                  { value: "4.9 ★", label: "рейтинг" },
                ].map(s => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-white font-black text-xl leading-none">{s.value}</span>
                    <span className="text-white/60 text-xs mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 bg-white text-brand-cyan font-bold px-6 py-3 rounded-xl text-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
                <Icon name="CalendarPlus" size={16} />
                Записаться к врачу
              </button>
            </div>

            {/* Screenshot */}
            <div className="hidden md:block flex-shrink-0 w-72 lg:w-80 xl:w-96 relative">
              <div className="relative">
                {/* glow */}
                <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
                <img
                  src="https://cdn.poehali.dev/projects/dc9c73b1-6f49-42f4-80b7-aa523686dce3/files/28942e55-459b-4b53-b80c-2ffa28154e36.jpg"
                  alt="Интерфейс записи к врачу"
                  className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/20 object-cover"
                  style={{ maxHeight: "220px", objectPosition: "top" }}
                />
                {/* floating badge */}
                <div className="absolute -bottom-3 -left-4 z-20 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-none">Запись подтверждена</div>
                    <div className="text-xs text-slate-400 mt-0.5">Сегодня в 14:30</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

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
        <div className="flex flex-col gap-5 mb-12">
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
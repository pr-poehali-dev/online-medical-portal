import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import SpecialtiesBar from "@/components/shared/SpecialtiesBar";
import Icon from "@/components/ui/icon";
import { reviews, diagnosticServices } from "@/data/mockData";

const stats = [
  { value: "240 000+", label: "Пациентов записано", icon: "Users", color: "text-cyan-500" },
  { value: "18 500+", label: "Отзывов о врачах", icon: "MessageSquare", color: "text-violet-500" },
  { value: "3 200+", label: "Врачей в базе", icon: "Stethoscope", color: "text-blue-500" },
  { value: "680+", label: "Клиник в базе", icon: "Building2", color: "text-teal-500" },
];

const mainCards = [
  { title: "Записаться к врачу", desc: "Выберите специалиста и удобное время", icon: "Stethoscope", href: "/doctors", gradient: "from-cyan-500 to-blue-600" },
  { title: "Выбрать клинику", desc: "Рейтинги, отзывы и цены", icon: "Building2", href: "/clinics", gradient: "from-violet-500 to-purple-700" },
  { title: "Записаться на диагностику", desc: "МРТ, УЗИ, КТ и лабораторные анализы", icon: "ScanLine", href: "/diagnostic-centers", gradient: "from-teal-500 to-cyan-600" },
  { title: "Услуги", desc: "Полный каталог медицинских услуг", icon: "LayoutGrid", href: "/services", gradient: "from-pink-500 to-rose-600" },
];

const medServices = [
  { title: "Вызов врача на дом", icon: "Home", color: "bg-cyan-50 text-cyan-600" },
  { title: "Телемедицина", icon: "Video", color: "bg-violet-50 text-violet-600" },
  { title: "Вакцинация", icon: "Syringe", color: "bg-teal-50 text-teal-600" },
  { title: "Скорая помощь", icon: "Ambulance", color: "bg-red-50 text-red-500" },
  { title: "Анализы на дому", icon: "FlaskConical", color: "bg-blue-50 text-blue-600" },
  { title: "Стоматология", icon: "Smile", color: "bg-pink-50 text-pink-600" },
  { title: "Психотерапия", icon: "Brain", color: "bg-indigo-50 text-indigo-600" },
  { title: "Реабилитация", icon: "Activity", color: "bg-amber-50 text-amber-600" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={13} className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

const specialtyList = [
  { label: "Терапевт", icon: "Stethoscope", count: 420, bgColor: "bg-cyan-50", textColor: "text-cyan-500" },
  { label: "Кардиолог", icon: "Heart", count: 185, bgColor: "bg-red-50", textColor: "text-red-500" },
  { label: "Невролог", icon: "Brain", count: 210, bgColor: "bg-violet-50", textColor: "text-violet-500" },
  { label: "Хирург", icon: "Scissors", count: 145, bgColor: "bg-blue-50", textColor: "text-blue-500" },
  { label: "Офтальмолог", icon: "Eye", count: 130, bgColor: "bg-teal-50", textColor: "text-teal-500" },
  { label: "Педиатр", icon: "Baby", count: 295, bgColor: "bg-pink-50", textColor: "text-pink-500" },
  { label: "Гинеколог", icon: "HeartPulse", count: 220, bgColor: "bg-rose-50", textColor: "text-rose-500" },
  { label: "Ортопед", icon: "Bone", count: 155, bgColor: "bg-amber-50", textColor: "text-amber-500" },
  { label: "Дерматолог", icon: "Layers", count: 190, bgColor: "bg-orange-50", textColor: "text-orange-500" },
  { label: "Психолог", icon: "SmilePlus", count: 175, bgColor: "bg-indigo-50", textColor: "text-indigo-500" },
  { label: "Уролог", icon: "Droplets", count: 140, bgColor: "bg-blue-50", textColor: "text-blue-500" },
  { label: "Эндокринолог", icon: "Activity", count: 110, bgColor: "bg-emerald-50", textColor: "text-emerald-500" },
];

const INITIAL_VISIBLE = 10;

export default function IndexPage() {
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const visibleSpecialties = showAllSpecialties ? specialtyList : specialtyList.slice(0, INITIAL_VISIBLE);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SpecialtiesBar />

      {/* Hero */}
      <section className="hero-bg py-16 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm px-4 py-2 rounded-full mb-5 backdrop-blur-sm border border-white/20">
              <Icon name="Zap" size={14} className="text-yellow-300" />
              <span>Запись к врачу онлайн за 2 минуты</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-5 leading-tight">
              Найдите лучшего врача<br />
              <span className="text-cyan-200">рядом с вами</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
              3 200+ врачей, 680+ клиник по всей России. Реальные отзывы, онлайн-расписание и мгновенная запись.
            </p>
            <SearchBar large className="max-w-2xl mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {["Терапевт", "Кардиолог", "Невролог", "Офтальмолог", "УЗИ", "МРТ", "Анализы"].map(t => (
              <button key={t} className="px-3 py-1.5 bg-white/15 border border-white/25 text-white text-sm rounded-full hover:bg-white/25 transition-all">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 840 0 720 0C600 0 240 60 0 20L0 60Z" fill="#f0f9ff"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="mesh-bg py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 text-center card-hover shadow-sm">
                <div className="w-11 h-11 rounded-xl mx-auto mb-3 flex items-center justify-center bg-white shadow-sm">
                  <Icon name={s.icon} size={22} className={s.color} fallback="Circle" />
                </div>
                <div className="text-2xl font-heading font-black text-slate-900 mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main 4 cards */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 text-center mb-3">Что вас интересует?</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Выберите нужный раздел и запишитесь онлайн</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mainCards.map((c) => (
              <Link
                key={c.title}
                to={c.href}
                className={`relative bg-gradient-to-br ${c.gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform" />
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Icon name={c.icon} size={24} className="text-white" fallback="Circle" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 leading-tight">{c.title}</h3>
                <p className="text-white/75 text-sm">{c.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-white/80 group-hover:text-white transition-colors">
                  <span>Перейти</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-1">Отзывы пациентов</h2>
              <p className="text-slate-500 text-sm">Реальные отзывы о врачах нашего портала</p>
            </div>
            <Link to="/doctors" className="hidden sm:flex items-center gap-1 text-brand-cyan font-medium text-sm hover:underline">
              Все отзывы <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.id} className="glass rounded-2xl p-5 shadow-sm card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{r.author}</div>
                    <div className="text-xs text-slate-400">{r.date}</div>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={r.rating} />
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">"{r.text}"</p>
                <div className="text-xs text-brand-cyan font-medium">Врач: {r.doctor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties grid */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 text-center mb-3">Специальности врачей</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Найдите нужного специалиста быстро</p>
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {visibleSpecialties.map((s) => (
                <Link
                  key={s.label}
                  to="/doctors"
                  className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 hover:border-brand-cyan/40 hover:shadow-md transition-all duration-200 group card-hover bg-white"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 ${s.bgColor}`}>
                    <Icon name={s.icon} size={22} fallback="Circle" className={s.textColor} />
                  </div>
                  <span className="font-semibold text-sm text-slate-800 mb-1">{s.label}</span>
                  <span className="text-xs text-slate-400">{s.count} врачей</span>
                </Link>
              ))}
            </div>
            {!showAllSpecialties && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          {!showAllSpecialties && (
            <div className="flex justify-center mt-7">
              <button
                onClick={() => setShowAllSpecialties(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-brand-cyan hover:text-brand-cyan transition-all shadow-sm"
              >
                <Icon name="ChevronDown" size={16} />
                Смотреть ещё {specialtyList.length - INITIAL_VISIBLE} специальности
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Diagnostics preview */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 mb-1">Обследования и диагностика</h2>
              <p className="text-slate-500 text-sm">Запишитесь на диагностику в удобную клинику</p>
            </div>
            <Link to="/diagnostics" className="hidden sm:flex items-center gap-1 text-brand-cyan font-medium text-sm hover:underline">
              Все услуги <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {diagnosticServices.slice(0, 3).map((d) => (
              <Link key={d.category} to="/diagnostics" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover group">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${d.color}`}>
                    <Icon name={d.icon} size={22} fallback="Circle" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm">{d.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {d.services.slice(0, 4).map(s => (
                    <span key={s} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100">{s}</span>
                  ))}
                  {d.services.length > 4 && (
                    <span className="text-xs text-brand-cyan font-medium px-2.5 py-1">+{d.services.length - 4} ещё</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Services */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-slate-900 text-center mb-3">Медицинские услуги</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Широкий спектр услуг для всей семьи</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {medServices.map((s) => (
              <button key={s.title} className="flex flex-col items-center text-center p-5 rounded-2xl border border-slate-100 hover:border-brand-cyan/40 hover:shadow-lg transition-all duration-200 card-hover bg-white group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${s.color}`}>
                  <Icon name={s.icon} size={26} fallback="Circle" />
                </div>
                <span className="font-semibold text-sm text-slate-800">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 hero-bg relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-4">Готовы записаться к врачу?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Запись занимает меньше 2 минут. Более 3 200 специалистов ждут вас.</p>
          <Link to="/doctors" className="inline-flex items-center gap-2 bg-white text-brand-cyan font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 text-base">
            <Icon name="CalendarPlus" size={20} />
            Записаться прямо сейчас
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
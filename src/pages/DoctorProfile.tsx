import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

type ReviewFilter = "all" | "positive" | "neutral" | "negative";

function OtherDoctorsSlider({ currentId }: { currentId: number }) {
  const others = doctors.filter(d => d.id !== currentId);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };
  return (
    <div className="bg-white border-t border-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900">Другие врачи</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-brand-cyan hover:text-brand-cyan transition-colors">
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button onClick={() => scroll("right")} className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-brand-cyan hover:text-brand-cyan transition-colors">
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>
        <div ref={sliderRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-2" style={{ scrollSnapType: "x mandatory" }}>
          {others.map(d => (
            <Link
              key={d.id}
              to={`/doctors/${d.id}`}
              className="flex-shrink-0 w-64 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md hover:border-brand-cyan/40 transition-all"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={d.photo} alt={d.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">{d.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">{d.specialties[0]}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <StarRating rating={d.rating} size={11} />
                <span className="text-xs text-slate-500">{d.rating} · {d.reviews} отзывов</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{d.experience} лет опыта</span>
                <span className="text-sm font-bold text-brand-cyan">от {d.price.toLocaleString()} ₽</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === Number(id));

  const [selectedClinic, setSelectedClinic] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const [visibleCount, setVisibleCount] = useState(3);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Врач не найден</h2>
            <button onClick={() => navigate("/doctors")} className="mt-4 px-6 py-3 gradient-brand text-white rounded-xl font-semibold">
              Вернуться к списку
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const doctorReviews = reviews.filter(r => r.doctorId === doctor.id);
  const filteredReviews = doctorReviews.filter(r => {
    if (reviewFilter === "positive") return r.rating >= 4;
    if (reviewFilter === "neutral") return r.rating === 3;
    if (reviewFilter === "negative") return r.rating <= 2;
    return true;
  });

  const reviewCounts = {
    all: doctorReviews.length,
    positive: doctorReviews.filter(r => r.rating >= 4).length,
    neutral: doctorReviews.filter(r => r.rating === 3).length,
    negative: doctorReviews.filter(r => r.rating <= 2).length,
  };

  const reviewFilters: { key: ReviewFilter; label: string; color: string; activeColor: string }[] = [
    { key: "all", label: `Все (${reviewCounts.all})`, color: "border-slate-200 text-slate-700", activeColor: "gradient-brand text-white border-transparent" },
    { key: "positive", label: `Положительные (${reviewCounts.positive})`, color: "border-emerald-200 text-emerald-700", activeColor: "bg-emerald-500 text-white border-transparent" },
    { key: "neutral", label: `Нейтральные (${reviewCounts.neutral})`, color: "border-amber-200 text-amber-700", activeColor: "bg-amber-400 text-white border-transparent" },
    { key: "negative", label: `Отрицательные (${reviewCounts.negative})`, color: "border-red-200 text-red-600", activeColor: "bg-red-500 text-white border-transparent" },
  ];

  const ratingColor = (r: number) => r >= 4 ? "text-emerald-600" : r === 3 ? "text-amber-500" : "text-red-500";
  const ratingBg = (r: number) => r >= 4 ? "bg-emerald-50 border-emerald-100" : r === 3 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-cyan transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <Link to="/doctors" className="hover:text-brand-cyan transition-colors">Врачи</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <span className="text-slate-800 font-medium truncate">{doctor.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">

        {/* ── 1. HERO: Фото + основная инфа ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-5">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Photo */}
            <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
              <div className="relative">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-36 h-36 rounded-2xl object-cover shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 gradient-brand rounded-full flex items-center justify-center shadow-md">
                  <Icon name="Check" size={14} className="text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <StarRating rating={doctor.rating} size={14} />
              </div>
              <div className="text-sm font-bold text-slate-800 mt-1">{doctor.rating.toFixed(1)}</div>
              <div className="text-xs text-slate-400">{doctor.reviews} отзывов</div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {doctor.specialties.map(s => (
                  <span key={s} className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-lg font-medium border border-cyan-100">{s}</span>
                ))}
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-3">{doctor.name}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-4">
                <span className="flex items-center gap-1.5">
                  <Icon name="Clock" size={15} className="text-brand-cyan flex-shrink-0" />
                  Стаж {doctor.experience} лет
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Award" size={15} className="text-brand-cyan flex-shrink-0" />
                  {doctor.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Phone" size={15} className="text-brand-cyan flex-shrink-0" />
                  {doctor.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Banknote" size={15} className="text-brand-cyan flex-shrink-0" />
                  от {doctor.price.toLocaleString()} ₽
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{doctor.description}</p>
            </div>
          </div>
        </div>

        {/* ── 2. ЗАПИСЬ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <h2 className="font-heading font-bold text-xl text-slate-900">Бесплатная запись на приём</h2>
          </div>

          {/* Клиники */}
          <div className="mb-5">
            <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-3">Выберите клинику</div>
            <div className="space-y-2">
              {doctor.clinics.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedClinic(i)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
                    selectedClinic === i
                      ? "border-brand-cyan bg-cyan-50/60 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    selectedClinic === i ? "border-brand-cyan" : "border-slate-300"
                  }`}>
                    {selectedClinic === i && <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm">{c.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <span className="w-4 h-4 bg-red-600 rounded-full inline-flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0">М</span>
                      {c.metro}
                      <span className="text-slate-300">·</span>
                      <span className="truncate">{c.address}</span>
                    </div>
                  </div>
                  {selectedClinic === i && (
                    <div className="text-xs text-brand-cyan font-semibold flex-shrink-0">
                      {c.slots.length} слотов
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Даты — горизонтальный скролл */}
          <div className="mb-5">
            <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-3">Дата приёма</div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {doctor.dates.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(i)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    selectedDate === i
                      ? "gradient-brand text-white border-transparent shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Слоты времени */}
          <div className="mb-6">
            <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-3">Время приёма</div>
            <div className="flex flex-wrap gap-2">
              {doctor.clinics[selectedClinic].slots.map(slot => (
                <button
                  key={slot}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-cyan-200 text-cyan-700 bg-cyan-50 hover:gradient-brand hover:text-white hover:border-transparent transition-all"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl text-base shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all">
            Записаться на приём
          </button>
        </div>

        {/* ── 3. ОТЗЫВЫ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl text-slate-900">
              Отзывы пациентов
            </h2>
            <div className="flex items-center gap-1.5">
              <StarRating rating={doctor.rating} size={15} />
              <span className="font-bold text-slate-800">{doctor.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Фильтры — горизонтальный скролл */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
            {reviewFilters.map(f => (
              <button
                key={f.key}
                onClick={() => { setReviewFilter(f.key); setVisibleCount(3); }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  reviewFilter === f.key ? f.activeColor : f.color + " bg-white hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Список отзывов */}
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-2 opacity-30" />
              <div className="text-sm">Нет отзывов в этой категории</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.slice(0, visibleCount).map(r => (
                <div key={r.id} className={`rounded-2xl border p-4 ${ratingBg(r.rating)}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{r.author}</div>
                        <div className="text-xs text-slate-400">{r.date}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 flex-shrink-0 font-bold text-sm ${ratingColor(r.rating)}`}>
                      <Icon name="Star" size={13} className="fill-current" />
                      {r.rating}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{r.text}</p>
                  {r.clinicReply && (
                    <div className="mt-3 ml-4 border-l-2 border-brand-cyan/40 pl-4 bg-cyan-50/50 rounded-r-xl py-3 pr-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center flex-shrink-0">
                          <Icon name="Building2" size={11} className="text-brand-cyan" />
                        </div>
                        <span className="text-xs font-semibold text-brand-cyan">{r.clinicReply.author}</span>
                        <span className="text-xs text-slate-400">{r.clinicReply.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{r.clinicReply.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {filteredReviews.length > visibleCount && (
            <button
              onClick={() => setVisibleCount(v => v + 3)}
              className="w-full mt-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-brand-cyan hover:text-brand-cyan transition-all flex items-center justify-center gap-2"
            >
              <Icon name="ChevronDown" size={16} />
              Показать ещё ({filteredReviews.length - visibleCount})
            </button>
          )}
        </div>

        {/* ── 4. О ВРАЧЕ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-heading font-bold text-xl text-slate-900 mb-5">О враче</h2>

          <div className="space-y-6">

            {/* Специализация */}
            {doctor.specialization && (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="Stethoscope" size={16} className="text-brand-cyan" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Специализация</h3>
                </div>
                <ul className="space-y-2 ml-11">
                  {doctor.specialization.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-slate-100" />

            {/* Образование */}
            {doctor.education && (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="GraduationCap" size={16} className="text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Образование</h3>
                </div>
                <div className="ml-11 space-y-3">
                  {doctor.education.map((e, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 text-xs font-bold text-slate-400 w-10 pt-0.5">{e.year}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{e.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{e.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-slate-100" />

            {/* Опыт работы */}
            {doctor.workHistory && (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="Briefcase" size={16} className="text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Опыт работы</h3>
                </div>
                <div className="ml-11 relative">
                  <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200" />
                  <div className="space-y-4">
                    {doctor.workHistory.map((w, i) => (
                      <div key={i} className="pl-5 relative">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-400 -translate-x-0.5" />
                        <div className="text-xs text-slate-400 font-medium mb-0.5">{w.period}</div>
                        <div className="text-sm font-semibold text-slate-800">{w.place}</div>
                        <div className="text-xs text-slate-500">{w.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-slate-100" />

            {/* Повышение квалификации */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Icon name="BookOpen" size={16} className="text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Повышение квалификации</h3>
              </div>
              {doctor.courses && doctor.courses.length > 0 ? (
                <div className="ml-11 space-y-3">
                  {doctor.courses.map((c, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                      <div className="flex-shrink-0 text-xs font-bold text-amber-600 w-10 pt-0.5">{c.year}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{c.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{c.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-11 flex items-center gap-2 text-sm text-slate-400 py-2">
                  <Icon name="Info" size={14} className="flex-shrink-0" />
                  Информация о курсах повышения квалификации не указана
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Other Doctors Slider */}
      <OtherDoctorsSlider currentId={doctor.id} />

      <Footer />
    </div>
  );
}
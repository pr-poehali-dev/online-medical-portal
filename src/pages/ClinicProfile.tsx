import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/icon";
import { clinics, doctors } from "@/data/mockData";

type Tab = "doctors" | "services" | "reviews" | "about";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={size} className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

function NearbySlider({ currentId }: { currentId: number }) {
  const others = clinics.filter(c => c.id !== currentId);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };
  return (
    <div className="bg-white border-t border-slate-100 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900">Клиники поблизости</h2>
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
          {[...others, ...others].map((c, i) => (
            <Link
              key={i}
              to={`/clinics/${c.id}`}
              className="flex-shrink-0 w-72 bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-brand-cyan/40 transition-all"
              style={{ scrollSnapAlign: "start" }}
            >
              <img src={c.images[0]} alt={c.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.logo}</span>
                  <div className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">{c.name}</div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <StarRating rating={c.rating} size={11} />
                  <span className="text-xs text-slate-500">{c.rating} · {c.reviews} отзывов</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span className="w-4 h-4 bg-red-600 rounded-full inline-flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0">М</span>
                  {c.metro[0]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClinicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clinic = clinics.find(c => c.id === Number(id));

  const [activeTab, setActiveTab] = useState<Tab>("doctors");
  const [activePhoto, setActivePhoto] = useState(0);
  const [visibleDoctors, setVisibleDoctors] = useState(3);
  const [visibleServices, setVisibleServices] = useState(4);
  const [visibleReviews, setVisibleReviews] = useState(3);

  if (!clinic) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏥</div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Клиника не найдена</h2>
            <button onClick={() => navigate("/clinics")} className="mt-4 px-6 py-3 gradient-brand text-white rounded-xl font-semibold">
              Вернуться к списку
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const clinicDoctors = doctors.filter(d => d.clinics.some(c => c.id === clinic.id));

  const tabs: { key: Tab; label: string; icon: string; count?: number }[] = [
    { key: "doctors", label: "Врачи", icon: "UserRound", count: clinic.doctors },
    { key: "services", label: "Услуги", icon: "Stethoscope", count: clinic.allServices.length },
    { key: "reviews", label: "Отзывы", icon: "MessageSquare", count: clinic.reviews },
    { key: "about", label: "О клинике", icon: "Info" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Хлебные крошки */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-cyan transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <Link to="/clinics" className="hover:text-brand-cyan transition-colors">Клиники</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <span className="text-slate-800 font-medium truncate">{clinic.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">

        {/* ── 1. ШАПКА: название + теги ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
          <div className="h-1.5 gradient-brand" />
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-4xl flex-shrink-0 shadow-sm">
                {clinic.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-2">{clinic.name}</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Icon name="MapPin" size={14} className="text-brand-cyan flex-shrink-0" />
                  <span>{clinic.address}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px]">М</span>
                    {clinic.metro.map((m, i) => (
                      <span key={m} className="text-sm text-slate-600">
                        {m}{i < clinic.metro.length - 1 && <span className="text-slate-300 ml-1.5">·</span>}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Icon name="Clock" size={13} className="text-brand-cyan" />
                    {clinic.schedule}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Icon name="Phone" size={13} className="text-brand-cyan" />
                    {clinic.phone}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1.5 justify-end mb-0.5">
                  <StarRating rating={clinic.rating} />
                  <span className="font-bold text-slate-900">{clinic.rating}</span>
                </div>
                <div className="text-xs text-slate-400 mb-3">{clinic.reviews} отзывов</div>
                <button className="gradient-brand text-white font-semibold py-2.5 px-5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md">
                  Записаться
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {clinic.tags.map(t => (
                <span key={t} className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <Icon name="Check" size={10} />
                  {t}
                </span>
              ))}
              <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">{clinic.price}</span>
            </div>
          </div>
        </div>

        {/* ── 2. ФОТОГАЛЕРЕЯ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
          <div className="relative">
            <img
              src={clinic.images[activePhoto]}
              alt={clinic.name}
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-none">
            {clinic.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  activePhoto === i ? "border-brand-cyan" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. МЕСТОПОЛОЖЕНИЕ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
          <div className="p-5 pb-3">
            <h2 className="font-heading font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <Icon name="MapPin" size={18} className="text-brand-cyan" />
              Местоположение
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1.5">
                <Icon name="MapPin" size={14} className="text-brand-cyan flex-shrink-0" />
                {clinic.address}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">М</span>
                {clinic.metro.join(", ")}
              </span>
            </div>
          </div>
          <div className="h-64 overflow-hidden rounded-b-2xl">
            <iframe
              title="Карта клиники"
              src={`https://maps.yandex.ru/?pt=${clinic.coords.lng},${clinic.coords.lat}&z=16&l=map`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* ── 4. ТАБЫ ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
          {/* Шапка табов */}
          <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-brand-cyan text-brand-cyan"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon name={tab.icon} size={15} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    activeTab === tab.key ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* TAB: Врачи */}
            {activeTab === "doctors" && (
              <div>
                {clinicDoctors.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">👨‍⚕️</div>
                    <p>Врачи этой клиники появятся скоро</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {clinicDoctors.slice(0, visibleDoctors).map(doc => (
                        <Link
                          key={doc.id}
                          to={`/doctors/${doc.id}`}
                          className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-brand-cyan/40 hover:shadow-sm transition-all"
                        >
                          <img src={doc.photo} alt={doc.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 mb-0.5">{doc.name}</div>
                            <div className="text-sm text-slate-500 mb-1">{doc.specialties.join(", ")}</div>
                            <div className="flex items-center gap-3 text-xs text-slate-400">
                              <span>{doc.experience} лет опыта</span>
                              <span>{doc.category}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 justify-end mb-1">
                              <StarRating rating={doc.rating} size={11} />
                              <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                            </div>
                            <div className="text-sm font-bold text-brand-cyan">от {doc.price.toLocaleString()} ₽</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {visibleDoctors < clinicDoctors.length && (
                      <button
                        onClick={() => setVisibleDoctors(v => v + 3)}
                        className="mt-4 w-full py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:border-brand-cyan hover:text-brand-cyan transition-all"
                      >
                        Показать ещё врачей
                      </button>
                    )}
                    {clinicDoctors.length === 0 && (
                      <p className="text-sm text-slate-400 mt-3 text-center">Всего {clinic.doctors} специалистов</p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* TAB: Услуги */}
            {activeTab === "services" && (
              <div>
                <div className="space-y-2">
                  {clinic.allServices.slice(0, visibleServices).map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-brand-cyan flex-shrink-0" />
                        <span className="text-sm text-slate-800">{s.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 flex-shrink-0 ml-4">{s.price}</span>
                    </div>
                  ))}
                </div>
                {visibleServices < clinic.allServices.length && (
                  <button
                    onClick={() => setVisibleServices(v => v + 4)}
                    className="mt-4 w-full py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:border-brand-cyan hover:text-brand-cyan transition-all"
                  >
                    Показать все услуги
                  </button>
                )}
              </div>
            )}

            {/* TAB: Отзывы */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-5">
                  <div className="text-center">
                    <div className="text-4xl font-black text-slate-900">{clinic.rating}</div>
                    <StarRating rating={clinic.rating} size={16} />
                    <div className="text-xs text-slate-400 mt-1">{clinic.reviews} отзывов</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5,4,3,2,1].map(star => {
                      const count = clinic.clinicReviews.filter(r => r.rating === star).length;
                      const pct = clinic.clinicReviews.length ? Math.round(count / clinic.clinicReviews.length * 100) : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-slate-500">{star}</span>
                          <Icon name="Star" size={10} className="text-amber-400 fill-amber-400" />
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-6 text-slate-400">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {clinic.clinicReviews.slice(0, visibleReviews).map(r => (
                    <div key={r.id} className="border border-slate-100 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full" />
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{r.author}</div>
                          <div className="text-xs text-slate-400">{r.date}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          <StarRating rating={r.rating} size={12} />
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
                {visibleReviews < clinic.clinicReviews.length && (
                  <button
                    onClick={() => setVisibleReviews(v => v + 3)}
                    className="mt-4 w-full py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:border-brand-cyan hover:text-brand-cyan transition-all"
                  >
                    Показать ещё отзывы
                  </button>
                )}
              </div>
            )}

            {/* TAB: О клинике */}
            {activeTab === "about" && (
              <div>
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed mb-6">
                  {clinic.about.split("\n\n").map((p, i) => (
                    <p key={i} className="mb-4 last:mb-0">{p}</p>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: "UserRound", label: "Врачей", value: `${clinic.doctors}` },
                    { icon: "Star", label: "Рейтинг", value: `${clinic.rating}` },
                    { icon: "MessageSquare", label: "Отзывов", value: `${clinic.reviews}` },
                    { icon: "Banknote", label: "Цены", value: clinic.price },
                  ].map(stat => (
                    <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <Icon name={stat.icon} size={20} className="text-brand-cyan mx-auto mb-1" />
                      <div className="font-bold text-slate-900 text-lg">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ── 5. КЛИНИКИ ПОБЛИЗОСТИ ── */}
      <NearbySlider currentId={clinic.id} />

      <Footer />
    </div>
  );
}

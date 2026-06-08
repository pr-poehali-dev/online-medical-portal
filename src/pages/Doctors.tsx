import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FilterPopup from "@/components/shared/FilterPopup";
import Icon from "@/components/ui/icon";
import { doctors, reviews } from "@/data/mockData";

interface BookingPopupProps {
  doctor: typeof doctors[0];
  slot: string;
  date: string;
  clinicIndex: number;
  onClose: () => void;
}

function BookingPopup({ doctor, slot, date, clinicIndex, onClose }: BookingPopupProps) {
  const clinic = doctor.clinics[clinicIndex];
  const [selectedClinicIdx, setSelectedClinicIdx] = useState(clinicIndex);
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fio.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden"
        style={{ animation: "bookingIn 200ms cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Запись на приём</h3>
            <p className="text-sm text-slate-500 mt-0.5">Заполните данные для подтверждения</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700 ml-3 flex-shrink-0">
            <Icon name="X" size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle2" size={32} className="text-emerald-500" />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 mb-1">Запись подтверждена!</h4>
            <p className="text-sm text-slate-500 mb-1">
              {doctor.name}
            </p>
            <p className="text-sm font-semibold text-slate-800 mb-4">
              {date} в {slot} · {doctor.clinics[selectedClinicIdx].name}
            </p>
            <button onClick={onClose} className="px-6 py-2.5 gradient-brand text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-md">
              Отлично!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

            {/* Doctor preview */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <img src={doctor.photo} alt={doctor.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">{doctor.name}</div>
                <div className="text-xs text-slate-400">{doctor.specialties.join(", ")}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-slate-400">Время</div>
                <div className="text-sm font-bold text-brand-cyan">{slot}</div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Дата приёма</label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700">
                <Icon name="Calendar" size={15} className="text-brand-cyan flex-shrink-0" />
                <span className="font-medium">{date}</span>
              </div>
            </div>

            {/* Clinic */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Клиника</label>
              <div className="space-y-1.5">
                {doctor.clinics.map((c, i) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setSelectedClinicIdx(i)}
                    className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                      selectedClinicIdx === i
                        ? "border-brand-cyan bg-cyan-50/60 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                      selectedClinicIdx === i ? "border-brand-cyan" : "border-slate-300"
                    }`}>
                      {selectedClinicIdx === i && <div className="w-2 h-2 rounded-full bg-brand-cyan" />}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{c.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <span className="w-4 h-4 bg-red-600 rounded-full inline-flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0">М</span>
                        {c.metro} · {c.address}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* FIO */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">ФИО пациента</label>
              <div className="relative">
                <Icon name="User" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  value={fio}
                  onChange={e => setFio(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-cyan-100 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Номер телефона</label>
              <div className="relative">
                <Icon name="Phone" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-cyan-100 transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full gradient-brand text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-all shadow-md mt-2"
            >
              Подтвердить запись
            </button>
          </form>
        )}
      </div>
      <style>{`@keyframes bookingIn { from { opacity: 0; transform: scale(0.95) translateY(10px) } to { opacity: 1; transform: scale(1) translateY(0) } }`}</style>
    </div>
  );
}

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
  const [booking, setBooking] = useState<{ slot: string } | null>(null);
  const navigate = useNavigate();

  return (
    <>
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
              <div className="flex flex-wrap gap-3 mt-1">
                {/* Приём в клинике */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                  <Icon name="Building2" size={13} className="text-brand-cyan flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 leading-none mb-0.5">Приём в клинике</div>
                    <div className="flex items-baseline gap-1.5">
                      {doctor.discount ? (
                        <>
                          <span className="text-base font-heading font-black text-slate-900">
                            {Math.round(doctor.priceClinic * (1 - doctor.discount / 100)).toLocaleString()} ₽
                          </span>
                          <span className="text-xs text-slate-400 line-through">{doctor.priceClinic.toLocaleString()} ₽</span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">−{doctor.discount}%</span>
                        </>
                      ) : (
                        <span className="text-base font-heading font-black text-slate-900">{doctor.priceClinic.toLocaleString()} ₽</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Выезд на дом */}
                {doctor.priceHome && (
                  <div className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-xl px-3 py-2">
                    <Icon name="Home" size={13} className="text-violet-500 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 leading-none mb-0.5">Выезд на дом</div>
                      <div className="flex items-baseline gap-1.5">
                        {doctor.discount ? (
                          <>
                            <span className="text-base font-heading font-black text-slate-900">
                              {Math.round(doctor.priceHome * (1 - doctor.discount / 100)).toLocaleString()} ₽
                            </span>
                            <span className="text-xs text-slate-400 line-through">{doctor.priceHome.toLocaleString()} ₽</span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">−{doctor.discount}%</span>
                          </>
                        ) : (
                          <span className="text-base font-heading font-black text-slate-900">{doctor.priceHome.toLocaleString()} ₽</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
                  onClick={() => setBooking({ slot })}
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

    {booking && (
      <BookingPopup
        doctor={doctor}
        slot={booking.slot}
        date={doctor.dates[selectedDate]}
        clinicIndex={selectedClinic}
        onClose={() => setBooking(null)}
      />
    )}
    </>
  );
}

const AI_SUGGESTIONS = [
  "Какой врач нужен при головной боли?",
  "Как выбрать кардиолога?",
  "Болит спина — к кому идти?",
  "Нужен врач для ребёнка",
];

const AI_RESPONSES: Record<string, string> = {
  "Какой врач нужен при головной боли?": "При головных болях стоит обратиться к **неврологу**. Если боли сопровождаются повышенным давлением — к **терапевту** или **кардиологу**. Покажу подходящих специалистов?",
  "Как выбрать кардиолога?": "Обращайте внимание на стаж от 10 лет, наличие учёной степени и отзывы пациентов. Среди наших врачей Петрова А.С. — кандидат наук с 14-летним опытом, рейтинг 4.9 ⭐",
  "Болит спина — к кому идти?": "При болях в спине чаще всего нужен **невролог** или **ортопед**. Если боль отдаёт в ногу — обязательно к неврологу. Записать к специалисту?",
  "Нужен врач для ребёнка": "Для детей нужен **педиатр** — он даст направление к узким специалистам. Также у нас есть детские офтальмологи и неврологи. Уточните, что беспокоит ребёнка?",
};

function AiBanner() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Привет! Я помогу подобрать нужного специалиста. Опишите симптомы или выберите вопрос ниже 👇" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = AI_RESPONSES[text] ?? "Понял вас! Рекомендую записаться на консультацию к терапевту — он направит к нужному специалисту. Выбрать время?";
      setTyping(false);
      setMessages(prev => [...prev, { role: "ai", text: reply }]);
    }, 900);
  };

  const renderText = (text: string) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 15% 60%, rgba(6,182,212,0.12) 0, transparent 45%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.12) 0, transparent 40%)"
      }} />

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">

          {/* Left: promo text */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-4 w-fit backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
              ИИ-помощник · бесплатно
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight mb-3">
              Не знаете, какой<br />врач вам нужен?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              Опишите симптомы — ИИ подберёт подходящего специалиста и поможет записаться за 30 секунд.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "Zap", label: "Мгновенный ответ" },
                { icon: "ShieldCheck", label: "Проверенные врачи" },
                { icon: "Clock", label: "Доступен 24/7" },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-1.5 bg-white/8 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-white/70">
                  <Icon name={f.icon as Parameters<typeof Icon>[0]["name"]} size={12} className="text-violet-400" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: chat window */}
          <div className="lg:w-[420px] xl:w-[480px] bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl overflow-hidden flex flex-col" style={{ minHeight: 300 }}>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Icon name="Bot" size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-none">МедИИ</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-white/50 text-xs">онлайн</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ maxHeight: 180 }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "ai" && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <Icon name="Bot" size={11} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-cyan text-white rounded-br-sm"
                      : "bg-white/12 text-white/90 rounded-bl-sm"
                  }`}>
                    {renderText(m.text)}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Icon name="Bot" size={11} className="text-white" />
                  </div>
                  <div className="bg-white/12 px-3 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    {[0, 1, 2].map(d => (
                      <div key={d} className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {AI_SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-1">
              <div className="flex gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-1.5">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                  placeholder="Опишите симптомы..."
                  className="flex-1 bg-transparent text-white text-xs placeholder-white/30 outline-none min-w-0"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-7 h-7 rounded-lg bg-brand-cyan disabled:opacity-30 flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-all"
                >
                  <Icon name="Send" size={13} className="text-white" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 4;

const SORT_OPTIONS = [
  { value: "rating", label: "По рейтингу" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "experience", label: "По стажу" },
];

export default function DoctorsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const allReviews = [...reviews, ...reviews].slice(0, 14);

  const sorted = [...doctors].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "experience") return b.experience - a.experience;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <AiBanner />

      {/* Hero search */}
      <section className="hero-bg py-10 md:py-14 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white mb-3 leading-tight">
              Врачи в <span className="text-cyan-200">Москве</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              3 200+ специалистов · онлайн-запись · реальные отзывы
            </p>
          </div>
          <SearchBar large className="max-w-2xl mx-auto" />
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["Терапевт", "Кардиолог", "Невролог", "Педиатр", "Гинеколог", "Дерматолог"].map(s => (
              <button
                key={s}
                className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={[{ label: "Врачи" }]} />



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

          {/* Sort dropdown */}
          <div className="ml-auto relative">
            <button
              onClick={() => setSortOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm hover:border-brand-cyan hover:text-brand-cyan transition-all"
            >
              <Icon name="ArrowUpDown" size={14} />
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <Icon name="ChevronDown" size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 min-w-[200px] overflow-hidden">
                {SORT_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => { setSort(o.value); setSortOpen(false); setPage(1); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sort === o.value ? "bg-cyan-50 text-brand-cyan font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-col gap-5 mb-6">
          {paginated.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-12">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
              const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
              const dots = !show && (p === 2 || p === totalPages - 1);
              if (!show && !dots) return null;
              if (dots) return <span key={p} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">…</span>;
              return (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all border ${
                    p === page
                      ? "gradient-brand text-white border-transparent shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}

        {/* SEO Content Block: Андролог */}
        <div className="mb-10 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-7 border-b border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon name="Stethoscope" size={22} className="text-blue-500" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900">Андролог — мужской врач-специалист</h2>
              <p className="text-sm text-slate-400 mt-0.5">Диагностика и лечение мужского здоровья</p>
            </div>
          </div>

          <div className="px-8 py-7 grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-800 mb-2">Кто такой андролог?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Андролог — врач узкой специализации, занимающийся диагностикой и лечением заболеваний мужской репродуктивной и мочеполовой системы. Специалист помогает при проблемах с потенцией, гормональном дисбалансе, бесплодии и воспалительных процессах.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-800 mb-3">С чем обращаются к андрологу</h3>
                <ul className="space-y-2">
                  {[
                    "Эректильная дисфункция и снижение либидо",
                    "Мужское бесплодие и нарушения спермограммы",
                    "Воспаление предстательной железы (простатит)",
                    "Варикоцеле и водянка яичка",
                    "Гормональные нарушения у мужчин",
                    "Заболевания, передающиеся половым путём",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={10} className="text-blue-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-800 mb-3">Когда нужна консультация</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Не откладывайте визит к андрологу, если вас беспокоят боль или дискомфорт в паховой области, изменения в работе мочеполовой системы, снижение мужских функций или вы планируете отцовство. Ранняя диагностика в разы увеличивает эффективность лечения.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
                  Мужчинам старше 40 лет рекомендуется профилактический осмотр андролога <strong>раз в год</strong> — даже при отсутствии жалоб.
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-800 mb-3">Что включает приём</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: "ClipboardList", text: "Сбор анамнеза" },
                    { icon: "Search", text: "УЗИ-диагностика" },
                    { icon: "FlaskConical", text: "Анализы крови и спермограмма" },
                    { icon: "ShieldCheck", text: "Назначение лечения" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-3 py-2.5">
                      <Icon name={item.icon} size={15} className="text-slate-400 flex-shrink-0" />
                      <span className="text-xs text-slate-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
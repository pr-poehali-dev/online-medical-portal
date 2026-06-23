import { useParams, useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/icon";
import { publications, authors } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  "Кардиология": "bg-red-50 text-red-600 border-red-100",
  "Неврология": "bg-violet-50 text-violet-600 border-violet-100",
  "Диагностика": "bg-cyan-50 text-cyan-600 border-cyan-100",
  "Ортопедия": "bg-amber-50 text-amber-600 border-amber-100",
  "Офтальмология": "bg-teal-50 text-teal-600 border-teal-100",
};

function OtherPublicationsSlider({ currentId }: { currentId: number }) {
  const others = publications.filter(p => p.id !== currentId);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="bg-white border-t border-slate-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-black text-xl md:text-2xl text-slate-900">Читайте также</h2>
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
          {[...others, ...others].map((pub, i) => (
            <Link
              key={i}
              to={`/publications/${pub.id}`}
              className="flex-shrink-0 w-72 bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-brand-cyan/40 transition-all"
              style={{ scrollSnapAlign: "start" }}
            >
              <img src={pub.image} alt={pub.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${categoryColors[pub.category] || "bg-slate-50 text-slate-500"}`}>
                  {pub.category}
                </span>
                <h3 className="font-semibold text-sm text-slate-900 mt-2 mb-2 line-clamp-2 leading-snug">{pub.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{pub.readTime}</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{pub.views.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PublicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pub = publications.find(p => p.id === Number(id));

  if (!pub) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Публикация не найдена</h2>
            <button onClick={() => navigate("/publications")} className="mt-4 px-6 py-3 gradient-brand text-white rounded-xl font-semibold">
              К списку публикаций
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const authorObj = authors.find(a => a.name.startsWith(pub.author.split(" ")[0]));
  const colorClass = categoryColors[pub.category] || "bg-slate-50 text-slate-500 border-slate-100";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Хлебные крошки */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-cyan transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <Link to="/publications" className="hover:text-brand-cyan transition-colors">Публикации</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <span className="text-slate-800 font-medium truncate">{pub.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* ── ОСНОВНОЙ КОНТЕНТ ── */}
          <div>

            {/* Hero */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
              <div className="relative">
                <img src={pub.image} alt={pub.title} className="w-full h-64 sm:h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${colorClass}`}>
                    {pub.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-4 leading-tight">
                  {pub.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-4 border-b border-slate-100">
                  {authorObj && (
                    <div className="flex items-center gap-2">
                      <img src={authorObj.photo} alt={authorObj.name} className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-slate-700">{pub.author}</span>
                    </div>
                  )}
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} className="text-brand-cyan" />
                    {pub.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} className="text-brand-cyan" />
                    {pub.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={14} className="text-brand-cyan" />
                    {pub.views.toLocaleString()} просмотров
                  </span>
                </div>
                <p className="text-slate-600 mt-4 text-base leading-relaxed italic">{pub.excerpt}</p>
              </div>
            </div>

            {/* Тело статьи */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-5">
              <div className="space-y-4">
                {pub.content.map((block, i) => {
                  if (block.type === "heading") {
                    return (
                      <h2 key={i} className="font-heading font-bold text-xl text-slate-900 mt-6 mb-2 first:mt-0">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "highlight") {
                    return (
                      <div key={i} className="flex gap-3 p-4 bg-cyan-50 border-l-4 border-brand-cyan rounded-r-xl">
                        <Icon name="Lightbulb" size={18} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                        <p className="text-cyan-900 text-sm leading-relaxed font-medium">{block.text}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-slate-700 leading-relaxed text-base">
                      {block.text}
                    </p>
                  );
                })}
              </div>

              {/* Теги */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100">
                {pub.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── БОКОВАЯ КОЛОНКА ── */}
          <div className="space-y-5">

            {/* Об авторе */}
            {authorObj && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Об авторе</div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={authorObj.photo} alt={authorObj.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm leading-snug">{authorObj.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{authorObj.specialty}</div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{authorObj.bio}</p>
                <div className="flex items-center gap-1 text-xs text-brand-cyan font-medium">
                  <Icon name="FileText" size={12} />
                  {authorObj.articles} публикаций
                </div>
              </div>
            )}

            {/* Поделиться */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Поделиться</div>
              <div className="flex gap-2">
                {[
                  { name: "Link2", label: "Скопировать" },
                  { name: "MessageCircle", label: "Telegram" },
                  { name: "Share2", label: "Ещё" },
                ].map(btn => (
                  <button
                    key={btn.label}
                    className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border border-slate-200 hover:border-brand-cyan hover:text-brand-cyan text-slate-500 transition-all text-xs"
                  >
                    <Icon name={btn.name} size={16} />
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA запись */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-5 text-white">
              <div className="font-heading font-bold text-base mb-2">Нужна консультация?</div>
              <p className="text-white/80 text-xs mb-4 leading-relaxed">Запишитесь к специалисту онлайн — быстро и бесплатно</p>
              <Link
                to="/doctors"
                className="flex items-center justify-center gap-2 bg-white text-brand-cyan font-semibold py-2.5 rounded-xl text-sm hover:bg-cyan-50 transition-colors"
              >
                <Icon name="CalendarPlus" size={15} />
                Найти врача
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Читайте также */}
      <OtherPublicationsSlider currentId={pub.id} />

      <Footer />
    </div>
  );
}

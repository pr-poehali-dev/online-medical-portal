import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SearchBar from "@/components/shared/SearchBar";
import Icon from "@/components/ui/icon";
import { publications, authors } from "@/data/mockData";

const categories = ["Все", "Кардиология", "Неврология", "Диагностика", "Ортопедия", "Офтальмология"];

const categoryColors: Record<string, string> = {
  "Кардиология": "bg-red-50 text-red-600",
  "Неврология": "bg-violet-50 text-violet-600",
  "Диагностика": "bg-cyan-50 text-cyan-600",
  "Ортопедия": "bg-amber-50 text-amber-600",
  "Офтальмология": "bg-teal-50 text-teal-600",
};

export default function PublicationsPage() {
  const navigate = useNavigate();
  const allPubs = [...publications, ...publications].slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-blue-600 to-indigo-800 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, white 0, transparent 50%)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Публикации" }]} />
          <h1 className="font-heading font-black text-3xl md:text-4xl text-white mt-4 mb-3">Медицинские публикации</h1>
          <p className="text-white/80 max-w-xl mb-6">
            Статьи о здоровье от практикующих врачей: советы, разборы симптомов и ответы на популярные медицинские вопросы.
          </p>
          <SearchBar placeholder="Поиск по публикациям..." className="max-w-xl" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                i === 0 ? "gradient-brand text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {allPubs.map((pub, i) => (
            <article key={i} onClick={() => navigate(`/publications/${pub.id}`)} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover group cursor-pointer">
              {/* Fake image placeholder */}
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="FileText" size={40} className="text-slate-300" />
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${categoryColors[pub.category] || "bg-slate-100 text-slate-600"}`}>
                    {pub.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-bold text-base text-slate-900 mb-2 leading-snug group-hover:text-brand-cyan transition-colors line-clamp-2">
                  {pub.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{pub.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const authorObj = authors.find(a => a.name.startsWith(pub.author.split(" ")[0]));
                      return authorObj ? (
                        <>
                          <img src={authorObj.photo} alt={pub.author} className="w-6 h-6 rounded-full" />
                          <span className="font-medium text-slate-600">{pub.author}</span>
                        </>
                      ) : (
                        <span className="font-medium text-slate-600">{pub.author}</span>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={11} />
                      {pub.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={11} />
                      {pub.views.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <span className="text-xs text-slate-400">{pub.date}</span>
                  <button className="flex items-center gap-1 text-brand-cyan text-xs font-medium group-hover:underline">
                    Читать <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl gradient-brand text-white font-semibold hover:opacity-90 transition-all shadow-md">
            <Icon name="RefreshCw" size={16} />
            Загрузить ещё
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/icon";
import { authors, publications } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  "Кардиология": "bg-red-50 text-red-600",
  "Неврология": "bg-violet-50 text-violet-600",
  "Диагностика": "bg-cyan-50 text-cyan-600",
  "Ортопедия": "bg-amber-50 text-amber-600",
  "Офтальмология": "bg-teal-50 text-teal-600",
};

export default function AuthorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const author = authors.find(a => a.id === Number(id));

  if (!author) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Автор не найден</h2>
            <button onClick={() => navigate("/authors")} className="mt-4 px-6 py-3 gradient-brand text-white rounded-xl font-semibold">
              К списку авторов
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const authorPubs = publications.filter(p =>
    p.author.startsWith(author.name.split(" ")[0])
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Хлебные крошки */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-cyan transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <Link to="/authors" className="hover:text-brand-cyan transition-colors">Авторы</Link>
            <Icon name="ChevronRight" size={14} className="text-slate-300" />
            <span className="text-slate-800 font-medium truncate">{author.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* ── КАРТОЧКА АВТОРА ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-600" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">

              {/* Фото */}
              <div className="relative flex-shrink-0">
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-28 h-28 rounded-2xl object-cover shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <Icon name="PenLine" size={16} className="text-white" />
                </div>
              </div>

              {/* Инфо */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-violet-600 mb-1">{author.specialty}</p>
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-3">{author.name}</h1>
                <p className="text-slate-600 leading-relaxed mb-4">{author.bio}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-2 rounded-xl text-sm font-semibold">
                    <Icon name="FileText" size={15} />
                    {authorPubs.length || author.articles} публикаций
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold">
                    <Icon name="Eye" size={15} />
                    {authorPubs.reduce((s, p) => s + p.views, 0).toLocaleString()} просмотров
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ПУБЛИКАЦИИ АВТОРА ── */}
        <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">
          Публикации автора
        </h2>

        {authorPubs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400">
            <Icon name="FileText" size={36} className="mx-auto mb-3 opacity-30" />
            <p>Публикации появятся скоро</p>
          </div>
        ) : (
          <div className="space-y-4">
            {authorPubs.map(pub => (
              <Link
                key={pub.id}
                to={`/publications/${pub.id}`}
                className="flex gap-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-brand-cyan/40 hover:shadow-md transition-all group"
              >
                <img
                  src={pub.image}
                  alt={pub.title}
                  className="w-32 sm:w-44 h-auto object-cover flex-shrink-0"
                />
                <div className="py-4 pr-4 flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${categoryColors[pub.category] || "bg-slate-100 text-slate-500"}`}>
                      {pub.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900 mt-2 mb-1 leading-snug group-hover:text-brand-cyan transition-colors line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
                      {pub.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} />{pub.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={11} />{pub.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={11} />{pub.views.toLocaleString()}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-brand-cyan font-medium">
                      Читать <Icon name="ArrowRight" size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── ДРУГИЕ АВТОРЫ ── */}
        <div className="mt-10">
          <h2 className="font-heading font-bold text-xl text-slate-900 mb-4">Другие авторы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {authors.filter(a => a.id !== author.id).map(a => (
              <Link
                key={a.id}
                to={`/authors/${a.id}`}
                className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 p-4 hover:border-violet-200 hover:shadow-sm transition-all group"
              >
                <img src={a.photo} alt={a.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
                    {a.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">{a.specialty.split(",")[0]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Icon from "@/components/ui/icon";
import { authors, publications } from "@/data/mockData";

export default function AuthorsPage() {
  const navigate = useNavigate();
  const allAuthors = [...authors, ...authors].slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-violet-600 to-purple-800 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, white 0, transparent 40%)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Авторы" }]} />
          <h1 className="font-heading font-black text-3xl md:text-4xl text-white mt-4 mb-3">Авторы публикаций</h1>
          <p className="text-white/80 max-w-xl">
            Медицинские материалы на нашем портале пишут практикующие врачи с опытом работы от 9 до 22 лет.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allAuthors.map((author, i) => {
            const authorPubs = publications.filter(p => p.author.startsWith(author.name.split(" ")[0]));
            const pubCount = authorPubs.length || author.articles;
            return (
              <div key={i} onClick={() => navigate(`/authors/${author.id}`)} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover group cursor-pointer">
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-600" />
                <div className="p-5 text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Icon name="PenLine" size={12} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-1 leading-tight">{author.name}</h3>
                  <p className="text-xs text-violet-600 font-medium mb-3">{author.specialty}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{author.bio}</p>
                  <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-violet-50 rounded-xl mb-4">
                    <Icon name="FileText" size={14} className="text-violet-500" />
                    <span className="text-sm font-semibold text-violet-700">{pubCount} статей</span>
                  </div>
                  <button className="w-full border border-violet-200 text-violet-700 font-medium py-2 rounded-xl text-sm hover:bg-violet-50 transition-colors">
                    Все публикации
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-violet-500 to-purple-700 rounded-2xl p-8 text-center text-white">
          <h3 className="font-heading font-black text-xl md:text-2xl mb-3">Хотите стать автором?</h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">Если вы практикующий врач и хотите делиться знаниями — напишите нам</p>
          <button className="inline-flex items-center gap-2 bg-white text-violet-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            <Icon name="Mail" size={18} />
            Стать автором
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
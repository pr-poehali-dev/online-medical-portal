import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Icon from "@/components/ui/icon";
import { diagnosticServices } from "@/data/mockData";

const extraServices = [
  {
    category: "Эндоскопия",
    icon: "Eye",
    color: "bg-orange-50 text-orange-600",
    services: ["Гастроскопия (ФГДС)", "Колоноскопия", "Бронхоскопия", "Цистоскопия"],
  },
  {
    category: "Функциональная диагностика",
    icon: "Activity",
    color: "bg-indigo-50 text-indigo-600",
    services: ["Спирометрия", "ЭЭГ (электроэнцефалограмма)", "РЭГ", "ЭМГ"],
  },
];

const allServices = [...diagnosticServices, ...extraServices];

export default function DiagnosticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0, transparent 35%)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Диагностика" }]} />
          <h1 className="font-heading font-black text-3xl md:text-4xl text-white mt-4 mb-3">Диагностика и обследования</h1>
          <p className="text-white/80 max-w-2xl leading-relaxed">
            Полный спектр диагностических услуг в проверенных клиниках Москвы. Запишитесь на МРТ, КТ, УЗИ или лабораторные анализы онлайн — выбирайте удобное время и место без очередей.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Quick Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["Все", "УЗИ", "МРТ", "КТ", "Анализы", "Кардиология", "Эндоскопия", "ЭКГ"].map((f, i) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                i === 0 ? "gradient-brand text-white shadow-md" : "border border-slate-200 bg-white text-slate-700 hover:border-brand-cyan hover:text-brand-cyan"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Services by Category */}
        <div className="space-y-6">
          {allServices.map((category) => (
            <div key={category.category} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center gap-3 p-5 md:p-6 border-b border-slate-50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${category.color}`}>
                  <Icon name={category.icon} size={24} fallback="Circle" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900">{category.category}</h2>
                  <span className="text-xs text-slate-400">{category.services.length} услуг</span>
                </div>
                <button className="ml-auto gradient-brand text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
                  Записаться
                </button>
              </div>

              {/* Services Grid */}
              <div className="p-5 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.services.map((service) => (
                    <button
                      key={service}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 hover:border-brand-cyan/40 hover:bg-cyan-50/30 transition-all text-left group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                        <Icon name="ChevronRight" size={14} className="text-brand-cyan" />
                      </div>
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{service}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h3 className="font-heading font-black text-xl md:text-2xl mb-3">Не нашли нужную услугу?</h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">Позвоните нам, и наши специалисты помогут подобрать подходящий центр диагностики</p>
          <button className="inline-flex items-center gap-2 bg-white text-teal-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            <Icon name="Phone" size={18} />
            8 800 000-00-00 (бесплатно)
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

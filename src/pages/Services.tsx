import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SearchBar from "@/components/shared/SearchBar";
import Icon from "@/components/ui/icon";

const serviceCategories = [
  {
    title: "Первичная помощь",
    icon: "Stethoscope",
    color: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    services: [
      { name: "Консультация терапевта", price: "от 1 200 ₽", time: "30 мин" },
      { name: "Консультация педиатра", price: "от 1 500 ₽", time: "45 мин" },
      { name: "Вызов врача на дом", price: "от 3 500 ₽", time: "1–3 ч" },
      { name: "Телемедицинская консультация", price: "от 800 ₽", time: "20 мин" },
    ],
  },
  {
    title: "Диагностика",
    icon: "ScanLine",
    color: "from-violet-500 to-purple-700",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    services: [
      { name: "МРТ головного мозга", price: "от 4 500 ₽", time: "40 мин" },
      { name: "КТ органов грудной клетки", price: "от 3 800 ₽", time: "20 мин" },
      { name: "УЗИ брюшной полости", price: "от 1 800 ₽", time: "30 мин" },
      { name: "ЭКГ с расшифровкой", price: "от 600 ₽", time: "15 мин" },
    ],
  },
  {
    title: "Лабораторные анализы",
    icon: "FlaskConical",
    color: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50",
    textColor: "text-teal-600",
    services: [
      { name: "Общий анализ крови", price: "от 350 ₽", time: "1 день" },
      { name: "Биохимия крови (расширенная)", price: "от 1 200 ₽", time: "1 день" },
      { name: "Анализ на гормоны щитовидной железы", price: "от 1 500 ₽", time: "2 дня" },
      { name: "ПЦР-тест", price: "от 800 ₽", time: "1 день" },
    ],
  },
  {
    title: "Хирургия",
    icon: "Scissors",
    color: "from-rose-500 to-pink-700",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    services: [
      { name: "Удаление новообразований", price: "от 5 000 ₽", time: "45 мин" },
      { name: "Малые хирургические операции", price: "от 8 000 ₽", time: "1–2 ч" },
      { name: "Лечение варикоза", price: "от 25 000 ₽", time: "2–3 ч" },
      { name: "Перевязка, обработка ран", price: "от 700 ₽", time: "20 мин" },
    ],
  },
  {
    title: "Стоматология",
    icon: "Smile",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    services: [
      { name: "Осмотр стоматолога", price: "от 500 ₽", time: "30 мин" },
      { name: "Лечение кариеса", price: "от 3 500 ₽", time: "1 ч" },
      { name: "Профессиональная чистка зубов", price: "от 4 000 ₽", time: "1.5 ч" },
      { name: "Удаление зуба", price: "от 2 500 ₽", time: "30 мин" },
    ],
  },
  {
    title: "Офтальмология",
    icon: "Eye",
    color: "from-indigo-500 to-blue-700",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    services: [
      { name: "Проверка зрения", price: "от 800 ₽", time: "30 мин" },
      { name: "Подбор очков / линз", price: "от 1 200 ₽", time: "45 мин" },
      { name: "Лазерная коррекция зрения", price: "от 30 000 ₽", time: "1 ч" },
      { name: "Лечение катаракты", price: "от 50 000 ₽", time: "2–3 ч" },
    ],
  },
];

export default function ServicesPage() {
  const [openCategories, setOpenCategories] = useState<string[]>(serviceCategories.map(c => c.title));
  const toggle = (title: string) =>
    setOpenCategories(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, white 0, transparent 40%), radial-gradient(circle at 20% 80%, white 0, transparent 40%)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Услуги" }]} />
          <h1 className="font-heading font-black text-3xl md:text-4xl text-white mt-4 mb-3">Медицинские услуги</h1>
          <p className="text-white/80 max-w-xl mb-6">
            Полный каталог медицинских услуг с актуальными ценами. Сравнивайте предложения клиник и записывайтесь онлайн.
          </p>
          <SearchBar placeholder="Найдите нужную услугу..." className="max-w-xl" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {serviceCategories.map((cat) => (
            <button key={cat.title} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all card-hover group text-center`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.bgLight} group-hover:scale-110 transition-transform`}>
                <Icon name={cat.icon} size={20} fallback="Circle" className={cat.textColor} />
              </div>
              <span className="text-xs font-semibold text-slate-700">{cat.title}</span>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {serviceCategories.map((cat) => {
            const isOpen = openCategories.includes(cat.title);
            return (
              <div key={cat.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <button
                  onClick={() => toggle(cat.title)}
                  className={`w-full bg-gradient-to-r ${cat.color} p-5 flex items-center gap-3 text-left`}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={cat.icon} size={22} className="text-white" fallback="Circle" />
                  </div>
                  <h2 className="font-heading font-bold text-lg text-white flex-1">{cat.title}</h2>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={`text-white/80 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="divide-y divide-slate-50">
                    {cat.services.map((service) => (
                      <div key={service.name} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">{service.name}</span>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Icon name="Clock" size={11} />
                              {service.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <span className="font-bold text-slate-900 text-sm">{service.price}</span>
                          <button className={`flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r ${cat.color} text-white text-xs font-semibold hover:opacity-90 transition-all shadow-sm hidden sm:flex items-center gap-1`}>
                            <Icon name="CalendarPlus" size={12} />
                            Записаться
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
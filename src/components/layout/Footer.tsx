import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">M</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">МедиФайнд</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Удобный сервис для записи к врачам, выбора клиник и диагностических центров по всей России.
            </p>
            <div className="flex gap-3">
              {["telegram", "vk", "youtube"].map((s) => (
                <button key={s} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-cyan hover:text-white text-slate-400 transition-all duration-200 flex items-center justify-center text-sm font-bold uppercase">
                  {s[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Пациентам</h4>
            <ul className="space-y-2 text-sm">
              {["Запись к врачу", "Список клиник", "Диагностика", "Медицинские услуги", "Отзывы о врачах"].map(l => (
                <li key={l}><a href="#" className="hover:text-brand-cyan transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Врачам</h4>
            <ul className="space-y-2 text-sm">
              {["Стать партнёром", "Личный кабинет", "Управление расписанием", "Статистика"].map(l => (
                <li key={l}><a href="#" className="hover:text-brand-cyan transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={15} className="text-brand-cyan" />
                <span>8 800 000-00-00</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={15} className="text-brand-cyan" />
                <span>info@medifind.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={15} className="text-brand-cyan mt-0.5" />
                <span>Москва, ул. Примерная, 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-6 mb-5">
          <div className="flex items-start gap-4 bg-slate-800/60 rounded-2xl p-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700 border border-slate-600 flex items-center justify-center">
              <span className="text-white font-black text-sm leading-none">18+</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Информация, представленная на сайте, не может быть использована для постановки диагноза, назначения лечения и не заменяет приём врача.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <span>© 2024 МедиФайнд. Все права защищены.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
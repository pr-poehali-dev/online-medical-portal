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
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-cyan" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.019-1.305.587-1.497c.598-.19 1.365 1.261 2.179 1.818.615.422 1.082.33 1.082.33l2.175-.03s1.137-.071.598-1.111c-.044-.081-.314-.675-1.616-1.907-1.361-1.289-1.178-1.08.46-3.31.999-1.337 1.398-2.153 1.273-2.503-.12-.333-.854-.245-.854-.245l-2.447.015s-.181-.025-.315.056c-.132.079-.216.264-.216.264s-.387 1.043-.903 1.93c-1.088 1.862-1.524 1.96-1.702 1.846-.414-.269-.31-1.079-.31-1.656 0-1.8.272-2.55-.529-2.743-.265-.064-.46-.107-1.138-.114-.869-.009-1.605.003-2.02.208-.277.136-.491.44-.361.457.161.021.526.099.72.363.25.341.241 1.107.241 1.107s.143 2.12-.335 2.384c-.329.18-.78-.187-1.748-1.869-.497-.862-.873-1.816-.873-1.816s-.072-.179-.202-.275c-.157-.117-.376-.154-.376-.154l-2.322.015s-.349.01-.477.163c-.114.136-.009.417-.009.417s1.816 4.27 3.872 6.423c1.886 1.978 4.029 1.848 4.029 1.848h.972z"/>
                  </svg>
                </div>
                <a href="https://vk.com/medifind" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors">
                  ВКонтакте
                </a>
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
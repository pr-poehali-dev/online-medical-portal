import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import CityModal from "@/components/shared/CityModal";

const navLinks = [
  { label: "Врачи", href: "/doctors", icon: "Stethoscope" },
  { label: "Клиники", href: "/clinics", icon: "Building2" },
  { label: "Диагностика", href: "/diagnostics", icon: "ScanLine" },
  { label: "Диагн. центры", href: "/diagnostic-centers", icon: "Microscope" },
  { label: "Услуги", href: "/services", icon: "LayoutGrid" },
  { label: "Публикации", href: "/publications", icon: "BookOpen" },
  { label: "Авторы", href: "/authors", icon: "Users" },
];

const extraLinks = [
  { label: "Кто лечит?", href: "/doctors", icon: "HeartPulse" },
  { label: "Отзывы", href: "/reviews", icon: "MessageSquare" },
  { label: "Контакты", href: "/contacts", icon: "Phone" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [city, setCity] = useState("Москва");
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 glass shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-heading">M</span>
              </div>
              <span className="hidden sm:block font-heading font-800 text-xl gradient-text">МедиФайнд</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.href
                      ? "text-brand-cyan bg-cyan-50"
                      : "text-slate-600 hover:text-brand-cyan hover:bg-cyan-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCityOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-brand-cyan hover:text-brand-cyan transition-all duration-200 bg-white"
              >
                <Icon name="MapPin" size={15} className="text-brand-cyan" />
                <span className="hidden md:inline">{city}</span>
                <Icon name="ChevronDown" size={13} className="hidden md:inline" />
              </button>

              <button className="px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200">
                <span className="hidden sm:inline">Записаться</span>
                <Icon name="CalendarPlus" size={16} className="sm:hidden" />
              </button>

              {/* Burger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Меню"
              >
                <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Drawer panel */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shadow">
                <span className="text-white font-bold font-heading">M</span>
              </div>
              <span className="font-heading font-bold text-lg gradient-text">МедиФайнд</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* City */}
          <div className="px-4 py-3 border-b border-slate-100">
            <button
              onClick={() => { setMobileOpen(false); setCityOpen(true); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-brand-cyan transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={14} className="text-brand-cyan" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs text-slate-400 leading-none mb-0.5">Ваш город</div>
                <div className="text-sm font-semibold text-slate-800">{city}</div>
              </div>
              <Icon name="ChevronRight" size={15} className="text-slate-400" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-cyan-50 text-brand-cyan"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-cyan"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      active ? "bg-cyan-100" : "bg-slate-100"
                    }`}>
                      <Icon
                        name={link.icon as Parameters<typeof Icon>[0]["name"]}
                        size={16}
                        className={active ? "text-brand-cyan" : "text-slate-500"}
                      />
                    </div>
                    {link.label}
                    {active && <Icon name="ChevronRight" size={14} className="text-brand-cyan ml-auto" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
              <div className="px-3 mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Дополнительно</span>
              </div>
              {extraLinks.map((link) => {
                const active = location.pathname === link.href && link.href !== "/doctors";
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-cyan-50 text-brand-cyan"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-cyan"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      active ? "bg-cyan-100" : "bg-slate-100"
                    }`}>
                      <Icon
                        name={link.icon as Parameters<typeof Icon>[0]["name"]}
                        size={15}
                        className={active ? "text-brand-cyan" : "text-slate-400"}
                      />
                    </div>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Drawer footer */}
          <div className="px-4 py-4 border-t border-slate-100">
            <button className="w-full py-3 rounded-xl gradient-brand text-white text-sm font-bold shadow-md hover:opacity-90 transition-all">
              Записаться к врачу
            </button>
          </div>
        </div>
      </div>

      <CityModal
        isOpen={cityOpen}
        onClose={() => setCityOpen(false)}
        currentCity={city}
        onSelect={setCity}
      />
    </>
  );
}
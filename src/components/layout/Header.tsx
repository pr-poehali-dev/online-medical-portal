import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Врачи", href: "/doctors" },
  { label: "Клиники", href: "/clinics" },
  { label: "Диагностика", href: "/diagnostics" },
  { label: "Диагн. центры", href: "/diagnostic-centers" },
  { label: "Услуги", href: "/services" },
  { label: "Публикации", href: "/publications" },
  { label: "Авторы", href: "/authors" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg font-heading">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-800 text-xl gradient-text">МедиФайнд</span>
            </div>
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
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-brand-cyan hover:text-brand-cyan transition-all duration-200 bg-white">
              <Icon name="MapPin" size={15} className="text-brand-cyan" />
              <span className="hidden md:inline">Москва</span>
              <Icon name="ChevronDown" size={13} className="hidden md:inline" />
            </button>
            <button className="px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200">
              <span className="hidden sm:inline">Записаться</span>
              <Icon name="CalendarPlus" size={16} className="sm:hidden" />
            </button>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="border-t border-slate-100 pt-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? "text-brand-cyan bg-cyan-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium">
                <Icon name="MapPin" size={15} className="text-brand-cyan" />
                Выбрать местоположение
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
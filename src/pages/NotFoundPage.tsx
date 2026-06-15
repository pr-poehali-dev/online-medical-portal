import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Icon from "@/components/ui/icon";

const QUICK_LINKS = [
  { label: "Врачи", href: "/doctors", icon: "UserRound" },
  { label: "Клиники", href: "/clinics", icon: "Building2" },
  { label: "Услуги", href: "/services", icon: "Stethoscope" },
  { label: "Диагностика", href: "/diagnostics", icon: "ScanLine" },
];

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-lg">

          <div className="relative inline-block mb-8">
            <div className="text-[120px] sm:text-[160px] font-heading font-black leading-none select-none bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              404
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-brand-cyan/10 blur-xl rounded-full" />
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-3">
            Страница не найдена
          </h1>
          <p className="text-slate-500 text-base mb-8 leading-relaxed">
            Возможно, она была перемещена или адрес введён с ошибкой.<br />
            Попробуйте один из популярных разделов:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {QUICK_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-brand-cyan/40 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={link.icon} size={20} className="text-brand-cyan" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{link.label}</span>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            <Icon name="House" size={18} />
            На главную
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

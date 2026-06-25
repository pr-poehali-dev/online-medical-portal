import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, white 0, transparent 50%)"
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs items={[{ label: "Контакты" }]} />
          <h1 className="font-heading font-black text-3xl md:text-4xl text-white mt-4 mb-3">Контакты</h1>
          <p className="text-white/80 max-w-xl">
            По всем вопросам пишите нам на почту{" "}
            <a href="mailto:zapismedbook@yandex.ru" className="text-white font-semibold underline underline-offset-2 hover:no-underline">
              zapismedbook@yandex.ru
            </a>{" "}
            или через форму ниже.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-2xl">

        {sent ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Icon name="CheckCircle" size={36} className="text-teal-500" />
            </div>
            <h2 className="font-heading font-black text-2xl text-slate-900 mb-2">Сообщение отправлено!</h2>
            <p className="text-slate-500 mb-6">Мы ответим вам в течение рабочего дня.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              Отправить ещё одно сообщение
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600" />
            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-6 p-4 bg-cyan-50 rounded-xl">
                <Icon name="Mail" size={18} className="text-brand-cyan flex-shrink-0" />
                <span className="text-sm text-slate-700">
                  Или напишите напрямую:{" "}
                  <a href="mailto:zapismedbook@yandex.ru" className="text-brand-cyan font-semibold hover:underline">
                    zapismedbook@yandex.ru
                  </a>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.ru"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Вопрос</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Опишите ваш вопрос..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 gradient-brand text-white font-bold py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md"
                >
                  <Icon name="Send" size={17} />
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  DotsLoader,
  SpinnerLoader,
  RingLoader,
  BarsLoader,
  PulseLoader,
  WaveLoader,
  OrbitLoader,
  DNALoader,
} from "@/components/ui/loaders";
import Icon from "@/components/ui/icon";

type Size = "sm" | "md" | "lg";

const LOADERS = [
  {
    id: "dots",
    name: "Точки",
    tag: "<DotsLoader />",
    desc: "Три точки, прыгают поочерёдно. Универсальный вариант для кнопок и небольших блоков.",
    component: (size: Size, color?: string) => <DotsLoader size={size} color={color} />,
  },
  {
    id: "spinner",
    name: "Спиннер",
    tag: "<SpinnerLoader />",
    desc: "Классический вращающийся кружок. Подходит для любых состояний загрузки.",
    component: (size: Size, color?: string) => <SpinnerLoader size={size} color={color} />,
  },
  {
    id: "ring",
    name: "Двойное кольцо",
    tag: "<RingLoader />",
    desc: "Два кольца вращаются в разные стороны. Эффектно смотрится на тёмном фоне.",
    component: (size: Size, color?: string) => <RingLoader size={size} color={color} />,
  },
  {
    id: "bars",
    name: "Полоски",
    tag: "<BarsLoader />",
    desc: "Пять полосок, анимируются как эквалайзер. Хорошо для аудио и медиа-контента.",
    component: (size: Size, color?: string) => <BarsLoader size={size} color={color} />,
  },
  {
    id: "pulse",
    name: "Пульс",
    tag: "<PulseLoader />",
    desc: "Расходящиеся круги как пульс. Отлично для онлайн-статусов и геолокации.",
    component: (size: Size, color?: string) => <PulseLoader size={size} color={color} />,
  },
  {
    id: "wave",
    name: "Волна",
    tag: "<WaveLoader />",
    desc: "Волнообразная анимация полосок. Подходит для загрузки данных и аналитики.",
    component: (size: Size, color?: string) => <WaveLoader size={size} color={color} />,
  },
  {
    id: "orbit",
    name: "Орбита",
    tag: "<OrbitLoader />",
    desc: "Точка вращается по орбите вокруг центра. Космический стиль, уникальный вид.",
    component: (size: Size, color?: string) => <OrbitLoader size={size} color={color} />,
  },
  {
    id: "dna",
    name: "ДНК",
    tag: "<DNALoader />",
    desc: "Двухцветные точки двигаются как цепочка ДНК. Идеален для медицинской темы.",
    component: (size: Size, color?: string) => <DNALoader size={size} color={color} />,
  },
];

const COLORS = [
  { label: "Циан (бренд)", value: "var(--brand-cyan)" },
  { label: "Фиолетовый", value: "var(--brand-violet)" },
  { label: "Синий", value: "var(--brand-blue)" },
  { label: "Зелёный", value: "var(--brand-teal)" },
  { label: "Розовый", value: "var(--brand-pink)" },
  { label: "Тёмный", value: "#1e293b" },
];

const BG_MODES = [
  { label: "Светлый", value: "bg-white" },
  { label: "Серый", value: "bg-slate-100" },
  { label: "Тёмный", value: "bg-slate-900" },
  { label: "Градиент", value: "bg-gradient-to-br from-blue-950 via-slate-900 to-violet-950" },
];

export default function LoadersPage() {
  const [size, setSize] = useState<Size>("md");
  const [colorIdx, setColorIdx] = useState(0);
  const [bgIdx, setBgIdx] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const color = COLORS[colorIdx].value;
  const bg = BG_MODES[bgIdx].value;
  const isDark = bgIdx >= 2;

  const copy = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopied(tag);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 py-10 flex-1">
        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 text-brand-cyan text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <Icon name="Loader" size={13} />
            UI-Kit · Лоадеры
          </div>
          <h1 className="font-heading font-black text-3xl text-slate-900 mb-2">Элементы загрузки</h1>
          <p className="text-slate-500 text-sm max-w-lg">
            Выберите понравившийся вариант, настройте размер и цвет — скопируйте тег для использования в проекте.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          {/* Size */}
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1.5">Размер</div>
            <div className="flex gap-1">
              {(["sm", "md", "lg"] as Size[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    size === s ? "bg-brand-cyan text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1.5">Цвет</div>
            <div className="flex gap-1.5">
              {COLORS.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setColorIdx(i)}
                  title={c.label}
                  className={`w-7 h-7 rounded-lg border-2 transition-all ${
                    colorIdx === i ? "border-slate-400 scale-110 shadow" : "border-transparent hover:scale-105"
                  }`}
                  style={{ background: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1.5">Фон превью</div>
            <div className="flex gap-1">
              {BG_MODES.map((b, i) => (
                <button
                  key={b.label}
                  onClick={() => setBgIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    bgIdx === i ? "bg-brand-cyan text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOADERS.map((loader) => (
            <div
              key={loader.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Preview area */}
              <div className={`${bg} flex items-center justify-center`} style={{ minHeight: 120 }}>
                {loader.component(size, color)}
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-heading font-bold text-slate-900 mb-1">{loader.name}</div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-3">{loader.desc}</p>

                {/* Tag + copy */}
                <button
                  onClick={() => copy(loader.tag)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                    copied === loader.tag
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-cyan-50 hover:border-brand-cyan hover:text-brand-cyan"
                  }`}
                >
                  <span>{loader.tag}</span>
                  <Icon
                    name={copied === loader.tag ? "Check" : "Copy"}
                    size={13}
                    className="flex-shrink-0"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Usage hint */}
        <div className="mt-8 p-5 bg-slate-900 rounded-2xl text-sm">
          <div className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-3">Пример использования</div>
          <pre className="text-cyan-400 leading-relaxed overflow-x-auto text-xs">{`import { DotsLoader, SpinnerLoader } from "@/components/ui/loaders";

// Размеры: "sm" | "md" | "lg"
// Цвет:   любой CSS-цвет или переменная

<DotsLoader />
<DotsLoader size="sm" color="var(--brand-violet)" />
<SpinnerLoader size="lg" color="#10b981" />`}</pre>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "center" | "bottom";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  align = "center",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "sm:w-[400px]",
    md: "sm:w-[560px]",
    lg: "sm:w-[720px]",
  }[size];

  const alignClass = align === "bottom"
    ? "items-end sm:items-center"
    : "items-center";

  const panelRadius = align === "bottom"
    ? "rounded-t-3xl sm:rounded-2xl"
    : "rounded-2xl";

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex ${alignClass} justify-center`}
      style={{ animation: "fadeIn 150ms ease" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full ${sizeClass} max-h-[90vh] bg-white ${panelRadius} shadow-2xl flex flex-col`}
        style={{ animation: "scaleIn 180ms cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
            <div>
              {title && <h3 className="font-heading font-bold text-lg text-slate-900">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-700 flex-shrink-0 ml-3"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
      <Link to="/" className="hover:text-brand-cyan transition-colors flex items-center gap-1">
        <Icon name="Home" size={14} />
        <span>Главная</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <Icon name="ChevronRight" size={14} className="text-slate-300" />
          {item.href ? (
            <Link to={item.href} className="hover:text-brand-cyan transition-colors">{item.label}</Link>
          ) : (
            <span className="text-slate-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

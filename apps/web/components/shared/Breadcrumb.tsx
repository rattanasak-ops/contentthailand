"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm font-thai">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--ct-text-faint)]" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-[var(--ct-text-muted)] hover:text-[var(--ct-text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ct-text-secondary)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

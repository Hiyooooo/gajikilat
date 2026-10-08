import React from "react";
import { Check, AlertTriangle, XCircle, LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "chip" | "success" | "warn" | "danger" | "neutral";
  className?: string;
}

export function Badge({
  children,
  icon: Icon,
  variant = "chip",
  className = "",
}: BadgeProps) {
  let styleClasses = "";
  let DefaultIcon: LucideIcon | null = null;

  if (variant === "chip") {
    styleClasses = "bg-emerald-50 border border-emerald-100 text-emerald-700";
  } else if (variant === "success") {
    styleClasses = "bg-emerald-50 border border-emerald-100 text-emerald-700";
    DefaultIcon = Check;
  } else if (variant === "warn") {
    styleClasses = "bg-warn-bg border border-warn/20 text-warn";
    DefaultIcon = AlertTriangle;
  } else if (variant === "danger") {
    styleClasses = "bg-danger-bg border border-danger/20 text-danger";
    DefaultIcon = XCircle;
  } else if (variant === "neutral") {
    styleClasses = "bg-canvas border border-rule text-ink-3";
  }

  const RenderIcon = Icon || DefaultIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-[12px] font-semibold rounded-[4px] leading-none shrink-0 ${styleClasses} ${className}`}
    >
      {RenderIcon && <RenderIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />}
      <span>{children}</span>
    </span>
  );
}

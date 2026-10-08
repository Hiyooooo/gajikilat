import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({ children, className = "", as: Component = "div" }: CardProps) {
  return (
    <Component
      className={`bg-paper border border-rule-2 rounded-[8px] shadow-[0_1px_2px_rgba(15,23,42,0.06)] flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </Component>
  );
}

export function CardHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-5 py-3 border-b border-rule flex items-center justify-between gap-3 bg-paper shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 md:p-6 flex-1 flex flex-col ${className}`}>{children}</div>;
}

export function CardFoot({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`px-5 py-3 border-t border-rule bg-canvas flex flex-wrap items-center gap-1.5 shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

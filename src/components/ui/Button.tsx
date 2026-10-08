import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-navy";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  isExternal = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex h-11 items-center justify-center rounded-[6px] px-5 text-[15px] font-semibold transition-colors duration-120 select-none focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]";

  let variantClasses = "";
  if (variant === "primary") {
    // Fill emerald, teks navy (kontras 7.04:1 sesuai 02 §2). DILARANG teks putih di atas emerald.
    variantClasses =
      "bg-emerald text-navy hover:bg-emerald-600 focus-visible:outline-emerald-700 active:bg-emerald-600";
  } else if (variant === "secondary") {
    variantClasses =
      "bg-paper border border-ink text-ink hover:bg-canvas focus-visible:outline-emerald-700 active:bg-canvas";
  } else if (variant === "outline-navy") {
    variantClasses =
      "bg-transparent border border-rule-navy text-on-navy hover:border-on-navy-2 hover:bg-navy-2/40 focus-visible:outline-emerald active:bg-navy-2/60";
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

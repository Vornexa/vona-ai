"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedSection stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <AnimatedItem className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Vona AI
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("tagline")}
            </p>
          </AnimatedItem>

          {/* Product */}
          <AnimatedItem>
            <h3 className="text-sm font-semibold text-foreground">
              {t("product")}
            </h3>
            <ul className="mt-3 space-y-2">
              {["features", "pricing", "api"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedItem>

          {/* Company */}
          <AnimatedItem>
            <h3 className="text-sm font-semibold text-foreground">
              {t("company")}
            </h3>
            <ul className="mt-3 space-y-2">
              {["about", "blog", "careers", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedItem>

          {/* Legal */}
          <AnimatedItem>
            <h3 className="text-sm font-semibold text-foreground">
              {t("legal")}
            </h3>
            <ul className="mt-3 space-y-2">
              {["privacy", "terms"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        </AnimatedSection>

        {/* Copyright */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}

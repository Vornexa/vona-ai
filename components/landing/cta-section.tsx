"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/animated-section";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-24 px-4">
      <AnimatedSection>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("subtitle")}
            </p>

            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {t("button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/animated-section";
import { Brain, Globe, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const icons = [Brain, Globe, Zap, Shield];

export function FeaturesSection() {
  const t = useTranslations("Features");

  const features = [
    {
      title: t("feature1Title"),
      description: t("feature1Description"),
      icon: icons[0],
    },
    {
      title: t("feature2Title"),
      description: t("feature2Description"),
      icon: icons[1],
    },
    {
      title: t("feature3Title"),
      description: t("feature3Description"),
      icon: icons[2],
    },
    {
      title: t("feature4Title"),
      description: t("feature4Description"),
      icon: icons[3],
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="text-center">
          <AnimatedItem>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <AnimatedItem key={index}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-card-hover"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="pointer-events-none absolute -bottom-1 -right-1 h-24 w-24 rounded-full bg-hero-glow opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

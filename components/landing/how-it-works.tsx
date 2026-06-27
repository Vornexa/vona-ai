"use client";

import { useTranslations } from "next-intl";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/animated-section";
import { UserPlus, MessageSquare, Trophy } from "lucide-react";

const stepIcons = [UserPlus, MessageSquare, Trophy];

export function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { title: t("step1Title"), description: t("step1Description"), icon: stepIcons[0] },
    { title: t("step2Title"), description: t("step2Description"), icon: stepIcons[1] },
    { title: t("step3Title"), description: t("step3Description"), icon: stepIcons[2] },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center">
          <AnimatedItem>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection stagger className="mt-16 relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <AnimatedItem key={index}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step Number + Icon */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

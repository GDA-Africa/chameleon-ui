import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { Card, CardContent } from "../molecules";
import { useThemeClasses } from "../context";
import type { TestimonialCarouselProps, Testimonial } from "./types";

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { name: "Sarah Chen", role: "CTO, TechCorp", avatar: "SC", text: "This platform transformed how our team works. Highly recommended!" },
  { name: "Mike Johnson", role: "CEO, StartupXYZ", avatar: "MJ", text: "Best investment we made this year. ROI was immediate." },
  { name: "Emma Davis", role: "Product Lead, BigCo", avatar: "ED", text: "Intuitive, powerful, and a joy to use every day." },
];

const colsMap = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  heading = "Loved by Thousands",
  subheading = "See what our customers have to say",
  testimonials = DEFAULT_TESTIMONIALS,
  autoScroll = false,
  delay = 4000,
  columns = 3,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoScroll || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, delay);
    return () => clearInterval(timer);
  }, [autoScroll, delay, testimonials.length]);

  const showNav = autoScroll || columns === 1;

  return (
    <section className={cn("space-y-10", className)}>
      {(heading || subheading) && (
        <div className="text-center space-y-4">
          {heading && <h2 className={cn("text-3xl md:text-5xl font-black tracking-tight", textPrimary)}>{heading}</h2>}
          {subheading && <p className={cn("text-lg max-w-2xl mx-auto", textMuted)}>{subheading}</p>}
        </div>
      )}

      <div className={cn("grid grid-cols-1 gap-6", colsMap[columns])}>
        {(columns === 1 ? [testimonials[current]!] : testimonials).map((testimonial, i) => (
          <Card key={i} animated={animated}>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating ?? 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className={cn("text-sm leading-relaxed", textMuted)}>"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] text-xs font-bold">
                  {testimonial.avatar ?? testimonial.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className={cn("text-sm font-semibold", textPrimary)}>{testimonial.name}</p>
                  <p className={cn("text-xs", textMuted)}>{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showNav && testimonials.length > 1 && (
        <div className="flex justify-center items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className={cn("text-sm", textMuted)}>{current + 1} / {testimonials.length}</span>
          <Button variant="ghost" size="icon" onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </section>
  );
};

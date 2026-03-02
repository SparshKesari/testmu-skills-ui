"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChaoticWordLayers } from "./ChaoticWordLayers";

/**
 * Stripe.dev-style fold after the footer: large 3D-style word with chaotic
 * layered copies that respond to scroll (scale/rotate/opacity change as you scroll).
 *
 * Tall section (200vh) with sticky content: long "infinite" down scroll,
 * then one scroll back up returns to the page.
 */
export function PostFooterFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      const sectionHeight = rect.height;
      // progress 0 = fold just entering view (top at bottom of viewport)
      // progress 1 = scrolled to end of fold (bottom at top of viewport)
      const raw = (windowHeight - rect.top) / sectionHeight;
      const progress = Math.max(0, Math.min(1, raw));
      setScrollProgress(progress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="post-footer-fold relative w-full overflow-hidden border-t border-border bg-muted/20"
      style={{ minHeight: "200vh" }}
      aria-label="Brand"
    >
      {/* Layered gradient continuation from footer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent_50%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(139,92,246,0.06),transparent_50%)]" aria-hidden />
      {/* Grid + crosshair background pattern - covers full section height */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Plus/cross symbols - subtle */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 5h2v14h-2V5zm-6 6v2h14v-2H5z' fill='%239aa0a6'/%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Sticky wrapper: content stays in view while you scroll through the tall section */}
      <div className="post-footer-fold-sticky sticky top-0 flex min-h-dvh min-h-[100vh] flex-col justify-between py-12 md:py-16">
        <div className="relative mx-auto flex min-h-[200px] flex-1 flex-col items-center justify-center overflow-visible px-4 md:px-6 lg:px-8">
          {/* Chaotic 3D layers + main word */}
          <ChaoticWordLayers scrollProgress={scrollProgress} />
        </div>

        {/* Corner branding and links */}
        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full border-2 border-[var(--stripe-accent-warm)] bg-transparent"
              aria-hidden
            />
            <span className="rounded-md border border-[var(--stripe-tag-border)] px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-[var(--stripe-tag-text)]">
              Dev
            </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TestMu AI
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 rounded-md border border-[var(--stripe-tag-border)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Link
              href="https://testmuai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              TestMu AI
            </Link>
            <span className="text-[var(--stripe-tag-border)]" aria-hidden>|</span>
            <a
              href="https://testmuai.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </a>
            <span className="text-[var(--stripe-tag-border)]" aria-hidden>|</span>
            <a
              href="https://testmuai.com/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              Legal
            </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

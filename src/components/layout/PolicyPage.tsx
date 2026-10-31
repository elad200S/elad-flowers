import type { ReactNode } from "react";

export default function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-10">{title}</h1>
      <div className="space-y-6 text-sm leading-7 text-ink/70">{children}</div>
    </div>
  );
}

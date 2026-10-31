"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FulfilledToggle({
  orderId,
  initialFulfilled,
}: {
  orderId: number;
  initialFulfilled: boolean;
}) {
  const router = useRouter();
  const [fulfilled, setFulfilled] = useState(initialFulfilled);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const next = !fulfilled;
    const res = await fetch(`/api/admin/orders/${orderId}/fulfilled`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fulfilled: next }),
    });
    setLoading(false);
    if (res.ok) {
      setFulfilled(next);
      router.refresh();
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-[11px] tracked-xs uppercase px-3 py-1.5 transition-colors disabled:opacity-50 ${
        fulfilled ? "bg-black/5 text-ink/60" : "bg-ink text-paper"
      }`}
    >
      {fulfilled ? "סמן כחדש" : "סמן כבוצע"}
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "שגיאה בהתחברות");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-serif text-2xl text-ink mb-8 text-center">כניסת ניהול</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמה"
          className="input"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper py-3 text-sm tracked-xs uppercase hover:bg-ink/85 transition-colors disabled:opacity-50"
        >
          {loading ? "מתחבר..." : "כניסה"}
        </button>
      </form>
    </div>
  );
}

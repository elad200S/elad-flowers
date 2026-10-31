"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="text-xs tracked-xs uppercase text-ink/60 hover:text-ink transition-colors border-b border-ink/30"
    >
      התנתקות
    </button>
  );
}

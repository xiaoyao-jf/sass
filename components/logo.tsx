import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Sparkles className="w-6 h-6 text-primary" />
      <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        AI爽文工坊
      </span>
    </Link>
  );
}

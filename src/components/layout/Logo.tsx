import Image from "next/image";

export default function Logo({ iconSize = 36, textClassName }: { iconSize?: number; textClassName?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image
        src="/logo-icon.png"
        alt=""
        width={iconSize}
        height={iconSize}
        style={{ width: iconSize, height: iconSize }}
        className="object-contain shrink-0"
        priority
      />
      <span className={textClassName ?? "font-serif text-lg sm:text-xl tracking-wide text-accent whitespace-nowrap"}>
        פרחי ד&apos; יתברך
      </span>
    </span>
  );
}

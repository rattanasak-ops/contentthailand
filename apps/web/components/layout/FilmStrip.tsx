import { cn } from "@/lib/utils";

interface FilmStripProps {
  children: React.ReactNode;
  color?: "pink" | "orange" | "purple" | "white" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  pink: "text-pink",
  orange: "text-orange",
  purple: "text-purple-light",
  white: "text-white",
  muted: "text-white/30",
};

const sizeMap = {
  sm: "text-xs gap-0.5",
  md: "text-sm gap-1",
  lg: "text-base gap-1.5",
};

function Perforations({ count, color, size }: { count: number; color: string; size: string }) {
  return (
    <span className={cn("flex items-center", sizeMap[size as keyof typeof sizeMap])}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(colorMap[color as keyof typeof colorMap], "opacity-60")}
          style={{ opacity: 0.3 + (i % 3) * 0.2 }}
        >
          ◼
        </span>
      ))}
    </span>
  );
}

export function FilmStrip({
  children,
  color = "pink",
  size = "md",
  className,
}: FilmStripProps) {
  const count = size === "sm" ? 4 : size === "lg" ? 8 : 6;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Perforations count={count} color={color} size={size} />
      <div className="flex-shrink-0">{children}</div>
      <Perforations count={count} color={color} size={size} />
    </div>
  );
}

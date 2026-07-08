interface BrandProps {
  title?: string;
  subtitle?: string;
  centered?: boolean;
  variant?: "default" | "sidebar";
}

export default function Brand({
  title = "InTrack",
  subtitle = "Streamlining Internship Management",
  centered = true,
  variant = "default"
}: BrandProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h1
  className={
    variant === "sidebar"
      ? "text-2xl font-bold text-foreground"
      : "text-5xl font-bold tracking-tight text-foreground"
  }
>
  {title}
</h1>

<p
  className={
    variant === "sidebar"
      ? "mt-1 text-xs uppercase tracking-wider text-muted-foreground"
      : "mt-2 text-lg text-muted-foreground"
  }
>
  {subtitle}
</p>
    </div>
  );
}
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
      {variant === "sidebar" ? (
        <div className="flex items-center gap-2">
          <img
            src="/icon.png"
            alt="InTrack"
            className="h-8 w-auto"
          />
          <h1 className="text-2xl font-bold">
            <span style={{ color: "#ffffff" }}>In</span>
            <span className="text-blue-500">Track</span>
          </h1>
        </div>
      ) : (
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      )}

      <p
        className={
          variant === "sidebar"
            ? "mt-1 text-xs uppercase tracking-wider text-slate-400"
            : "mt-2 text-lg text-muted-foreground"
        }
      >
        {subtitle}
      </p>
    </div>
  );
}

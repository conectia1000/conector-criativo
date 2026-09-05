import { cn } from "@/lib/utils";

/**
 * Marca do sistema. SVG inline: "+" com 4 nós conectados ao centro,
 * em gradiente rosa-coral, dentro de quadrado arredondado com anel sutil.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Conect IA"
      className={cn("size-9", className)}
    >
      <defs>
        <linearGradient id="ci-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF4F86" />
          <stop offset="100%" stopColor="#FF8A4F" />
        </linearGradient>
      </defs>

      {/* anel sutil */}
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="14"
        fill="none"
        stroke="url(#ci-grad)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* quadrado arredondado */}
      <rect x="5" y="5" width="38" height="38" rx="11" fill="url(#ci-grad)" />

      {/* braços do "+" */}
      <g stroke="#15121C" strokeWidth="2.6" strokeLinecap="round" opacity="0.92">
        <path d="M24 24V14" />
        <path d="M24 24v10" />
        <path d="M24 24H14" />
        <path d="M24 24h10" />
      </g>
      {/* nós nas pontas + centro */}
      <g fill="#15121C" opacity="0.92">
        <circle cx="24" cy="13" r="3.1" />
        <circle cx="24" cy="35" r="3.1" />
        <circle cx="13" cy="24" r="3.1" />
        <circle cx="35" cy="24" r="3.1" />
        <circle cx="24" cy="24" r="2.2" />
      </g>
      {/* pontinhos de brilho */}
      <g fill="#FFFFFF">
        <circle cx="15" cy="12" r="1.1" opacity="0.85" />
        <circle cx="34" cy="15" r="0.8" opacity="0.6" />
        <circle cx="12.5" cy="34" r="0.7" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-base font-semibold tracking-tight", className)}>
      <span className="text-foreground">Conect</span>
      <span className="brand-text"> IA</span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <Wordmark />
    </span>
  );
}

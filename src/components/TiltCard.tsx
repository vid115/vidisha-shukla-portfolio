import type { MouseEvent, ReactNode } from "react";
import { useTilt } from "../hooks/useTilt";

type TiltCardProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
};

/**
 * A clickable card with a subtle pointer-driven tilt and a soft spotlight
 * that follows the cursor. Purely decorative on touch devices (the pointer
 * handlers no-op for non-mouse input, see useTilt).
 */
export function TiltCard({ children, onClick, className = "", ariaLabel }: TiltCardProps) {
  const { ref, handlePointerMove, handlePointerLeave } = useTilt<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={ariaLabel}
      className={`group/tilt relative text-left transition-transform duration-150 ease-out will-change-transform ${className}`}
      style={{
        transform: "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        transformStyle: "preserve-3d",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(226,164,78,0.14), transparent 65%)",
        }}
      />
      {children}
    </button>
  );
}

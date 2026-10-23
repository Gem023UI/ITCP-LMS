import * as React from "react";
import "./LiquidGlass.css";

export type LiquidGlassProps = React.HTMLAttributes<HTMLElement> & {
  /** Element to render. @default "div" */
  as?: React.ElementType;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function LiquidGlass({
  as: Tag = "div",
  className,
  children,
  type,
  ...props
}: LiquidGlassProps) {
  const extra = Tag === "button" ? { type: type ?? "button" } : {};
  const classes = ["liquid-glass", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} {...extra} {...props}>
      <span className="liquid-glass__content">{children}</span>
    </Tag>
  );
}

export default LiquidGlass;
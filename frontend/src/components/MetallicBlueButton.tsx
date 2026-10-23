import * as React from "react";
import { useCursorLight } from "./CursorLight";
import "./MetallicBlueButton.css";
import "./MetallicBlue.css";

export type MetallicBlueButtonProps = React.HTMLAttributes<HTMLElement> & {
  /** Element to render. @default "button" */
  as?: React.ElementType;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function MetallicBlueButton({
  as: Tag = "button",
  className,
  children,
  type,
  ...props
}: MetallicBlueButtonProps) {
  const ref = React.useRef<HTMLElement>(null);
  useCursorLight(ref);

  const extra = Tag === "button" ? { type: type ?? "button" } : {};
  const classes = ["metallic-blue-surface", "metallic-blue-btn", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...extra} {...props}>
      <span className="metallic-blue-btn__label">{children}</span>
    </Tag>
  );
}

export default MetallicBlueButton;
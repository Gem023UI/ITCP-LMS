import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import "./ConfirmModal.css";

interface Props {
  title: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** red confirm button for destructive actions */
  danger?: boolean;
  busy?: boolean;
  error?: string | null;
  /** extra content between the message and the buttons (e.g. a date picker) */
  children?: React.ReactNode;
  disabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = false,
  busy = false,
  error,
  children,
  disabled = false,
  onConfirm,
  onCancel,
}: Props) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busy && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onCancel]);

  return (
    <div className="confirm__overlay" onClick={() => !busy && onCancel()}>
      <LiquidGlass
        className="confirm__modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="confirm__body">
          <h3>{title}</h3>
          {message && <p className="confirm__message">{message}</p>}
          {children}
          {error && <p className="confirm__error">{error}</p>}
          <div className="confirm__actions">
            <LiquidGlass as="button" type="button" disabled={busy} onClick={onCancel}>
              {cancelLabel}
            </LiquidGlass>
            {danger ? (
              <LiquidGlass
                as="button"
                type="button"
                className="confirm__danger"
                disabled={busy || disabled}
                onClick={onConfirm}
              >
                {busy ? "Working…" : confirmLabel}
              </LiquidGlass>
            ) : (
              <MetallicBlueButton type="button" disabled={busy || disabled} onClick={onConfirm}>
                {busy ? "Working…" : confirmLabel}
              </MetallicBlueButton>
            )}
          </div>
        </div>
      </LiquidGlass>
    </div>
  );
}

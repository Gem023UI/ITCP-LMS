import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import type { ArticleInput } from "../services/articleApi";
import { errText } from "../utils/errorText";
import "./CreateArticleModal.css";

const MAX_SECTIONS = 30;
const URL_RE = /^https?:\/\/\S+$/i;

type SectionDraft = { header: string; imageUrl: string; content: string };
const blankSection = (): SectionDraft => ({ header: "", imageUrl: "", content: "" });

interface Props {
  /** pass an article to edit it; omit to write a new one */
  initial?: ArticleInput;
  onClose: () => void;
  onSubmit: (values: ArticleInput) => Promise<void>;
}

export default function CreateArticleModal({ initial, onClose, onSubmit }: Props) {
  const editing = !!initial;
  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [coverUrl, setCoverUrl] = React.useState(initial?.coverImageUrl ?? "");
  const [sections, setSections] = React.useState<SectionDraft[]>(
    initial
      ? initial.sections.map((s) => ({ header: s.header, imageUrl: s.imageUrl ?? "", content: s.content }))
      : [blankSection()],
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const patchSection = (i: number, p: Partial<SectionDraft>) =>
    setSections((ss) => ss.map((s, j) => (j === i ? { ...s, ...p } : s)));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Title is required";
    if (!URL_RE.test(coverUrl.trim())) next.cover = "Enter a valid image URL (http or https)";
    sections.forEach((s, i) => {
      if (!s.header.trim()) next[`header-${i}`] = "Section header is required";
      if (!s.content.trim()) next[`content-${i}`] = "Section content is required";
      if (s.imageUrl.trim() && !URL_RE.test(s.imageUrl.trim())) next[`image-${i}`] = "Enter a valid image URL";
    });
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setFormError(null);
    try {
      await onSubmit({
        title: title.trim(),
        coverImageUrl: coverUrl.trim(),
        sections: sections.map((s) => ({
          header: s.header.trim(),
          imageUrl: s.imageUrl.trim() || null,
          content: s.content.trim(),
        })),
      });
    } catch (err) {
      setFormError(errText(err));
      setBusy(false);
    }
  };

  return (
    <div className="create-article__overlay" onClick={onClose}>
      <LiquidGlass className="create-article__modal" onClick={(e) => e.stopPropagation()}>
        <form className="create-article__form" onSubmit={submit} noValidate>
          <h3>{editing ? "Edit article" : "Write an article"}</h3>

          <label className="create-article__field">
            Title
            <input value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="create-article__error">{errors.title}</span>}
          </label>

          <label className="create-article__field">
            Cover image URL
            <input
              value={coverUrl}
              placeholder="https://…"
              onChange={(e) => setCoverUrl(e.target.value)}
            />
            {errors.cover && <span className="create-article__error">{errors.cover}</span>}
          </label>
          {URL_RE.test(coverUrl.trim()) && (
            <div className="create-article__cover">
              <img src={coverUrl.trim()} alt="Cover preview" />
            </div>
          )}

          {sections.map((s, i) => (
            <div key={i} className="create-article__section">
              <div className="create-article__section-head">
                <strong>Section {i + 1}</strong>
                {sections.length > 1 && (
                  <button
                    type="button"
                    className="create-article__link"
                    onClick={() => setSections((ss) => ss.filter((_, j) => j !== i))}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label className="create-article__field">
                Header
                <input
                  value={s.header}
                  maxLength={200}
                  onChange={(e) => patchSection(i, { header: e.target.value })}
                />
                {errors[`header-${i}`] && <span className="create-article__error">{errors[`header-${i}`]}</span>}
              </label>

              <label className="create-article__field">
                Image URL (optional)
                <input
                  value={s.imageUrl}
                  placeholder="https://…"
                  onChange={(e) => patchSection(i, { imageUrl: e.target.value })}
                />
                {errors[`image-${i}`] && <span className="create-article__error">{errors[`image-${i}`]}</span>}
              </label>

              <label className="create-article__field">
                Content
                <textarea
                  className="create-article__body"
                  rows={6}
                  value={s.content}
                  placeholder="Leave a blank line between paragraphs."
                  onChange={(e) => patchSection(i, { content: e.target.value })}
                />
                {errors[`content-${i}`] && (
                  <span className="create-article__error">{errors[`content-${i}`]}</span>
                )}
              </label>
            </div>
          ))}

          {sections.length < MAX_SECTIONS && (
            <button
              type="button"
              className="create-article__link"
              onClick={() => setSections((ss) => [...ss, blankSection()])}
            >
              + Add section
            </button>
          )}

          {formError && <span className="create-article__error">{formError}</span>}

          <div className="create-article__actions">
            <LiquidGlass as="button" type="button" onClick={onClose}>
              Cancel
            </LiquidGlass>
            <MetallicBlueButton type="submit" disabled={busy}>
              {busy ? "Saving…" : editing ? "Save changes" : "Publish"}
            </MetallicBlueButton>
          </div>
        </form>
      </LiquidGlass>
    </div>
  );
}
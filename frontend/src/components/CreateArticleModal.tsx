import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import "./CreateArticleModal.css";

const MAX_COVER_BYTES = 2 * 1024 * 1024;
const MAX_DESC = 160;

export type CreateArticleValues = {
  title: string;
  description: string;
  body: string;
  coverUrl: string | null;
  coverFile: File | null;
};

interface Props {
  onClose: () => void;
  onPublish: (values: CreateArticleValues) => void;
}

export default function CreateArticleModal({ onClose, onPublish }: Props) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [body, setBody] = React.useState("");
  const [coverUrl, setCoverUrl] = React.useState<string | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const fileRef = React.useRef<HTMLInputElement>(null);
  const pendingUrl = React.useRef<string | null>(null); // object URL created in this modal

  const discardPending = () => {
    if (pendingUrl.current) URL.revokeObjectURL(pendingUrl.current);
    pendingUrl.current = null;
  };

  const close = React.useCallback(() => {
    discardPending();
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, cover: "Please choose an image file" }));
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      setErrors((p) => ({ ...p, cover: "Image must be 2 MB or smaller" }));
      return;
    }
    discardPending();
    pendingUrl.current = URL.createObjectURL(file);
    setCoverFile(file);
    setCoverUrl(pendingUrl.current);
    setErrors((p) => {
      const { cover: _c, ...rest } = p;
      return rest;
    });
  };

  const removeCover = () => {
    discardPending();
    setCoverFile(null);
    setCoverUrl(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Title is required";
    if (!description.trim()) next.description = "Description is required";
    if (!body.trim()) next.body = "Write something for your article";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: replace with the real API call (create article + cover upload)
    console.log("Publish article", { title: title.trim(), description: description.trim(), coverFile });

    pendingUrl.current = null; // ownership of the object URL moves to the store
    onPublish({ title, description, body, coverUrl, coverFile });
  };

  return (
    <div className="create-article__overlay" onClick={close}>
      <LiquidGlass className="create-article__modal" onClick={(e) => e.stopPropagation()}>
        <form className="create-article__form" onSubmit={submit} noValidate>
          <h3>Write an article</h3>

          <div className="create-article__field">
            Cover image (optional)
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickFile} />
            {coverUrl ? (
              <div className="create-article__cover">
                <img src={coverUrl} alt="Cover preview" />
                <button type="button" className="create-article__remove" onClick={removeCover}>
                  Remove
                </button>
              </div>
            ) : (
              <button type="button" className="create-article__drop" onClick={() => fileRef.current?.click()}>
                Upload cover image
                <small>PNG or JPG, up to 2 MB</small>
              </button>
            )}
            {errors.cover && <span className="create-article__error">{errors.cover}</span>}
          </div>

          <label className="create-article__field">
            Title
            <input value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="create-article__error">{errors.title}</span>}
          </label>

          <label className="create-article__field">
            Short description
            <textarea
              rows={2}
              value={description}
              maxLength={MAX_DESC}
              onChange={(e) => setDescription(e.target.value)}
            />
            <small className="create-article__count">
              {description.length}/{MAX_DESC}
            </small>
            {errors.description && <span className="create-article__error">{errors.description}</span>}
          </label>

          <label className="create-article__field">
            Content
            <textarea
              className="create-article__body"
              rows={8}
              value={body}
              placeholder="Leave a blank line between paragraphs."
              onChange={(e) => setBody(e.target.value)}
            />
            {errors.body && <span className="create-article__error">{errors.body}</span>}
          </label>

          <div className="create-article__actions">
            <LiquidGlass as="button" type="button" onClick={close}>
              Cancel
            </LiquidGlass>
            <MetallicBlueButton type="submit">Publish</MetallicBlueButton>
          </div>
        </form>
      </LiquidGlass>
    </div>
  );
}
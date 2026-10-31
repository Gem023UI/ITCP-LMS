import * as React from "react";
import LiquidGlass from "./LiquidGlass";
import MetallicBlueButton from "./MetallicBlueButton";
import { getMissingPasswordRules } from "../utils/authValidators";
import "./ProfileEditModal.css";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export type ProfileEdit = {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  avatarFile: File | null;
  passwordChanged: boolean;
};

interface Props {
  initial: { firstName: string; lastName: string; avatarUrl: string | null };
  onClose: () => void;
  onSave: (values: ProfileEdit) => void;
}

export default function EditProfileModal({ initial, onClose, onSave }: Props) {
  const [firstName, setFirstName] = React.useState(initial.firstName);
  const [lastName, setLastName] = React.useState(initial.lastName);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(initial.avatarUrl);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [currentPw, setCurrentPw] = React.useState("");
  const [newPw, setNewPw] = React.useState("");
  const [confirmPw, setConfirmPw] = React.useState("");
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
      setErrors((p) => ({ ...p, avatar: "Please choose an image file" }));
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setErrors((p) => ({ ...p, avatar: "Image must be 2 MB or smaller" }));
      return;
    }
    discardPending();
    pendingUrl.current = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarUrl(pendingUrl.current);
    setErrors((p) => {
      const { avatar: _a, ...rest } = p;
      return rest;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};

    if (!firstName.trim()) next.firstName = "First name is required";
    if (!lastName.trim()) next.lastName = "Last name is required";

    const changingPw = !!(currentPw || newPw || confirmPw);
    if (changingPw) {
      if (!currentPw) next.currentPw = "Enter your current password";
      const missing = getMissingPasswordRules(newPw);
      if (missing.length) next.newPw = `Password needs: ${missing.join(", ")}`;
      if (confirmPw !== newPw) next.confirmPw = "Passwords do not match";
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: replace with the real API calls (profile update, avatar upload, change password)
    console.log("Save profile", {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatarFile,
      passwordChange: changingPw,
    });

    pendingUrl.current = null; // ownership of the object URL moves to the parent
    onSave({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatarUrl,
      avatarFile,
      passwordChanged: changingPw,
    });
  };

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  return (
    <div className="edit-profile__overlay" onClick={close}>
      <LiquidGlass className="edit-profile__modal" onClick={(e) => e.stopPropagation()}>
        <form className="edit-profile__form" onSubmit={submit} noValidate>
          <h3>Edit Profile</h3>

          <div className="edit-profile__avatar-row">
            <div className="edit-profile__avatar">
              {avatarUrl ? <img src={avatarUrl} alt="Profile preview" /> : <span>{initials || "?"}</span>}
            </div>
            <div className="edit-profile__avatar-actions">
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickFile} />
              <LiquidGlass as="button" type="button" onClick={() => fileRef.current?.click()}>
                Upload Photo
              </LiquidGlass>
              <small>PNG or JPG, up to 2 MB</small>
              {errors.avatar && <span className="edit-profile__error">{errors.avatar}</span>}
            </div>
          </div>

          <div className="edit-profile__grid">
            <label className="edit-profile__field">
              First name
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
              {errors.firstName && <span className="edit-profile__error">{errors.firstName}</span>}
            </label>
            <label className="edit-profile__field">
              Last name
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
              {errors.lastName && <span className="edit-profile__error">{errors.lastName}</span>}
            </label>
          </div>

          <h4>Change password</h4>
          <label className="edit-profile__field">
            Current password
            <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} autoComplete="current-password" />
            {errors.currentPw && <span className="edit-profile__error">{errors.currentPw}</span>}
          </label>
          <label className="edit-profile__field">
            New password
            <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} autoComplete="new-password" />
            {errors.newPw && <span className="edit-profile__error">{errors.newPw}</span>}
          </label>
          <label className="edit-profile__field">
            Confirm new password
            <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} autoComplete="new-password" />
            {errors.confirmPw && <span className="edit-profile__error">{errors.confirmPw}</span>}
          </label>

          <div className="edit-profile__actions">
            <LiquidGlass as="button" type="button" onClick={close}>
              Cancel
            </LiquidGlass>
            <MetallicBlueButton type="submit">Save Changes</MetallicBlueButton>
          </div>
        </form>
      </LiquidGlass>
    </div>
  );
}
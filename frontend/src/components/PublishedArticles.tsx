import * as React from "react";
import { useNavigate } from "react-router-dom";
import TrendingCarousel from "./TrendingCarousel";
import ConfirmModal from "./ConfirmModal";
import LiquidGlass from "./LiquidGlass";
import { patchLike, useToggleLike, type LikeResult } from "../hooks/useToggleLike";
import { ApiError } from "../services/authApi";
import { articlesApi, type ArticleSummary } from "../services/articleApi";
import { errText } from "../utils/errorText";
import "../styles/Profile.css";

export default function PublishedArticles({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<ArticleSummary[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // delete-article confirmation
  const [toDelete, setToDelete] = React.useState<ArticleSummary | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);

  const fail = React.useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    },
    [navigate],
  );

  React.useEffect(() => {
    let cancelled = false;
    setArticles(null);
    articlesApi
      .list({ authorId: userId, sort: "latest", limit: 50 })
      .then((r) => {
        if (cancelled) return;
        setArticles(r.articles);
        setError(null);
      })
      .catch((e) => !cancelled && fail(e));
    return () => {
      cancelled = true;
    };
  }, [userId, fail]);

  const onLikeUpdate = React.useCallback((id: string, r: LikeResult) => {
    setArticles((list) => (list ? patchLike(list, id, r) : list));
    setError(null);
  }, []);
  const toggleLike = useToggleLike(onLikeUpdate, fail);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await articlesApi.remove(toDelete.id);
      setArticles((list) => list?.filter((a) => a.id !== toDelete.id) ?? null);
      setToDelete(null);
    } catch (e) {
      setDeleteError(errText(e));
    } finally {
      setDeleting(false);
    }
  };

  const closeDelete = () => {
    setToDelete(null);
    setDeleteError(null);
  };

  return (
    <section className="profile__section profile__articles">
      <h2 className="profile__heading">Published Articles</h2>

      {error && <p className="profile__message">{error}</p>}

      {articles === null ? (
        !error && <p className="profile__message">Loading your articles…</p>
      ) : articles.length ? (
        <TrendingCarousel
          articles={articles}
          onOpen={(a) => navigate(`/articles/${a.id}`)}
          canLike
          onToggleLike={(a) => toggleLike(a.id)}
          renderFooter={(a) => (
            <LiquidGlass
              as="button"
              type="button"
              className="profile__delete"
              onClick={() => setToDelete(a)}
            >
              Delete Article
            </LiquidGlass>
          )}
        />
      ) : (
        <p className="profile__message">You haven't published any articles yet.</p>
      )}

      {toDelete && (
        <ConfirmModal
          title="Delete this article?"
          message={`"${toDelete.title}" and its likes will be permanently removed. This can't be undone.`}
          confirmLabel="Delete"
          danger
          busy={deleting}
          error={deleteError}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </section>
  );
}
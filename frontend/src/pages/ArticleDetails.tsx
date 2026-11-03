import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LiquidGlass from "../components/LiquidGlass";
import CreateArticleModal from "../components/CreateArticleModal";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import {
  articlesApi,
  authorName,
  readMinutes,
  type ArticleDetail,
  type ArticleInput,
} from "../services/articleApi";
import { errText } from "../utils/errorText";
import "../styles/ArticleDetails.css";

const prettyDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const paragraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

export default function ArticlePage() {
  const navigate = useNavigate();
  const { articleId = "" } = useParams();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [article, setArticle] = React.useState<ArticleDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [liking, setLiking] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status === 403) {
        setError(authError.message);
        setLoading(false);
      } else navigate("/auth", { replace: true });
    }
  }, [authLoading, user, authError, navigate]);

  const userId = user?.id;
  React.useEffect(() => {
    if (!userId || !articleId) return;
    let cancelled = false;
    setLoading(true);
    articlesApi
      .get(articleId)
      .then(({ article }) => {
        if (cancelled) return;
        setArticle(article);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setArticle(null);
        if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
        else if (!(e instanceof ApiError && e.status === 404)) setError(errText(e));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId, articleId, navigate]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const isAuthor = !!user && !!article && article.author.id === user.id;
  const canLike = user?.role === "STUDENT" || user?.role === "TEACHER"; // admin is view-only

  const toggleLike = async () => {
    if (!article || liking) return;
    setLiking(true);
    try {
      const r = await articlesApi.toggleLike(article.id);
      setArticle((a) => a && { ...a, likedByMe: r.liked, likesCount: r.likesCount });
    } catch (e) {
      setError(errText(e));
    } finally {
      setLiking(false);
    }
  };

  const remove = async () => {
    if (!article || !window.confirm("Delete this article? This can't be undone.")) return;
    try {
      await articlesApi.remove(article.id);
      navigate("/articles", { replace: true });
    } catch (e) {
      setError(errText(e));
    }
  };

  const saveEdit = async (values: ArticleInput) => {
    if (!article) return;
    const { article: updated } = await articlesApi.update(article.id, values);
    setArticle(updated);
    setEditing(false);
  };

  const back = (
    <button type="button" className="article-page__back" onClick={() => navigate("/articles")}>
      ← All articles
    </button>
  );

  if (loading) {
    return (
      <div className="article-page">
        {back}
        <p className="article-page__p">Loading article…</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page">
        {back}
        <h1 className="article-page__title">Article not found</h1>
        <p className="article-page__p">{error ?? "This article doesn't exist or was removed."}</p>
      </div>
    );
  }

  return (
    <div className="article-page">
      {back}
      <article className="article-page__article">
        <img className="article-page__cover" src={article.coverImageUrl} alt="" />
        <h1 className="article-page__title">{article.title}</h1>
        <p className="article-page__meta">
          {authorName(article.author)} · {prettyDate(article.createdAt)} · {readMinutes(article.sections)} min
          read · {article.likesCount.toLocaleString()} likes
        </p>

        {(canLike || isAuthor) && (
          <div className="article-page__actions">
            {canLike && (
              <LiquidGlass
                as="button"
                type="button"
                 className={`article-page__like${article.likedByMe ? " is-liked" : ""}`}
                disabled={liking}
                aria-pressed={article.likedByMe}
                onClick={toggleLike}
              >
                {article.likedByMe ? "♥ Liked" : "♡ Like"}
              </LiquidGlass>
            )}
            {isAuthor && (
              <>
                <LiquidGlass as="button" type="button" onClick={() => setEditing(true)}>
                  Edit
                </LiquidGlass>
                <LiquidGlass as="button" type="button" className="article-page__danger" onClick={remove}>
                  Delete
                </LiquidGlass>
              </>
            )}
          </div>
        )}

        {error && <p className="article-page__p">{error}</p>}

        {article.sections.map((s, i) => (
          <section key={i}>
            <h2 className="article-page__h2">{s.header}</h2>
            {s.imageUrl && <img className="article-page__section-img" src={s.imageUrl} alt="" loading="lazy" />}
            {paragraphs(s.content).map((p, j) => (
              <p key={j} className="article-page__p">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      {editing && (
        <CreateArticleModal
          initial={{
            title: article.title,
            coverImageUrl: article.coverImageUrl,
            sections: article.sections,
          }}
          onClose={() => setEditing(false)}
          onSubmit={saveEdit}
        />
      )}
    </div>
  );
}
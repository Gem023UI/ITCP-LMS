import * as React from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import CreateArticleModal from "../components/CreateArticleModal";
import TrendingCarousel from "../components/TrendingCarousel";
import MetallicBlueButton from "../components/MetallicBlueButton";
import LiquidGlass from "../components/LiquidGlass";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../services/authApi";
import {
  articlesApi,
  authorName,
  type ArticleInput,
  type ArticleSummary,
} from "../services/articleApi";
import { errText } from "../utils/errorText";
import "../styles/Articles.css";

const PAGE_SIZE = 12;
const TRENDING_MIN_LIKES = 10;

export default function Articles() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();

  const [trending, setTrending] = React.useState<ArticleSummary[]>([]);
  const [articles, setArticles] = React.useState<ArticleSummary[]>([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState(false);

  // teachers and students publish; admins can only read
  const canWrite = user?.role === "STUDENT" || user?.role === "TEACHER";

  const fail = React.useCallback(
    (e: unknown) => {
      if (e instanceof ApiError && e.status === 401) navigate("/auth", { replace: true });
      else setError(errText(e));
    },
    [navigate],
  );

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
    if (!userId) return;
    let cancelled = false;
    setLoading(true);
    Promise.all([
      articlesApi.list({ sort: "popular", limit: 10 }),
      articlesApi.list({ sort: "latest", page: 1, limit: PAGE_SIZE }),
    ])
      .then(([popular, latest]) => {
        if (cancelled) return;
        setTrending(popular.articles.filter((a) => a.likesCount >= TRENDING_MIN_LIKES));
        setArticles(latest.articles);
        setTotal(latest.total);
        setPage(1);
        setError(null);
      })
      .catch((e) => !cancelled && fail(e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId, fail]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = await articlesApi.list({ sort: "latest", page: page + 1, limit: PAGE_SIZE });
      setArticles((prev) => {
        const seen = new Set(prev.map((a) => a.id));
        return [...prev, ...next.articles.filter((a) => !seen.has(a.id))];
      });
      setPage(next.page);
      setTotal(next.total);
    } catch (e) {
      fail(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const publish = async (values: ArticleInput) => {
    const { article } = await articlesApi.create(values);
    setCreating(false);
    navigate(`/articles/${article.id}`);
  };

  return (
    <div className="articles">
      {error && <p className="articles__error">{error}</p>}

      <section className="articles__trending">
        <h2 className="articles__heading">Trending Articles</h2>
        {trending.length ? (
          <TrendingCarousel articles={trending} onOpen={(a) => navigate(`/articles/${a.id}`)} />
        ) : (
          <p className="articles__hint">{loading ? "Loading…" : "No trending articles yet."}</p>
        )}
      </section>

      {canWrite && (
        <section className="articles__write">
          <div>
            <h2 className="articles__heading">Write an article</h2>
            <p className="articles__hint">Share what you've learned with others.</p>
          </div>
          <MetallicBlueButton className="articles__create" onClick={() => setCreating(true)}>
            Create Article
          </MetallicBlueButton>
        </section>
      )}

      <section className="articles__section">
        <h2 className="articles__heading">Articles</h2>
        {!loading && articles.length === 0 ? (
          <p className="articles__hint">No articles yet.</p>
        ) : (
          <div className="articles__list">
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                className="article-card--inline"
                title={a.title}
                description={a.excerpt}
                coverUrl={a.coverImageUrl}
                author={authorName(a.author)}
                likes={a.likesCount}
                onOpen={() => navigate(`/articles/${a.id}`)}
              />
            ))}
          </div>
        )}
        {articles.length < total && (
          <LiquidGlass as="button" type="button" disabled={loadingMore} onClick={loadMore}>
            {loadingMore ? "Loading…" : "Load more"}
          </LiquidGlass>
        )}
      </section>

      {creating && <CreateArticleModal onClose={() => setCreating(false)} onSubmit={publish} />}
    </div>
  );
}
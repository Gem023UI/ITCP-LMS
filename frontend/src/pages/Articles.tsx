import * as React from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import CreateArticleModal from "../components/CreateArticleModal";
import TrendingCarousel from "../components/TrendingCarousel";
import MetallicBlueButton from "../components/MetallicBlueButton";
import { useAuth } from "../hooks/useAuth";
import { homeFor } from "../utils/roleRoutes";
import { addArticle, useArticles } from "../data/articleStore";
import "../styles/Articles.css";

export default function Articles() {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const articles = useArticles();
  const [creating, setCreating] = React.useState(false);

  const trending = React.useMemo(
    () => articles.filter((a) => a.likes >= 10).sort((a, b) => b.likes - a.likes),
    [articles],
  );

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status !== 403) navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "STUDENT") navigate(homeFor(user.role), { replace: true });
  }, [authLoading, user, authError, navigate]);

  return (
    <div className="articles">
      {authError?.status === 403 && <p className="articles__error">{authError.message}</p>}

      <section className="articles__trending">
        <h2 className="articles__heading">Trending Articles</h2>
        {trending.length ? (
          <TrendingCarousel articles={trending} onOpen={(a) => navigate(`/articles/${a.id}`)} />
        ) : (
          <p className="articles__hint">No trending articles yet.</p>
        )}
      </section>

      <section className="articles__write">
        <div>
          <h2 className="articles__heading">Write an article</h2>
          <p className="articles__hint">Share what you've learned with other students.</p>
        </div>
        <MetallicBlueButton className="articles__create" onClick={() => setCreating(true)}>
          Create Article
        </MetallicBlueButton>
      </section>

      <section className="articles__section">
        <h2 className="articles__heading">Articles</h2>
        <div className="articles__list">
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              className="article-card--inline"
              title={a.title}
              description={a.description}
              coverUrl={a.coverUrl}
              readMinutes={a.readMinutes}
              likes={a.likes}
              onOpen={() => navigate(`/articles/${a.id}`)}
            />
          ))}
        </div>
      </section>

      {creating && (
        <CreateArticleModal
          onClose={() => setCreating(false)}
          onPublish={(v) => {
            addArticle({
              title: v.title,
              description: v.description,
              body: v.body,
              coverUrl: v.coverUrl,
            });
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}
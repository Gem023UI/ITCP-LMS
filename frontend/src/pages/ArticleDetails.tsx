import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { homeFor } from "../utils/roleRoutes";
import type { ArticleBlock } from "../data/articles";
import { useArticle } from "../data/articleStore";
import "../styles/ArticleDetails.css";

const prettyDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="article-page__h2">{block.text}</h2>;
    case "list":
      return (
        <ul className="article-page__list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="article-page__p">{block.text}</p>;
  }
}

export default function ArticlePage() {
  const navigate = useNavigate();
  const { articleId = "" } = useParams();
  const { user, loading: authLoading, error: authError } = useAuth();
  const article = useArticle(articleId);

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (authError?.status !== 403) navigate("/auth", { replace: true });
      return;
    }
    if (user.role !== "STUDENT") navigate(homeFor(user.role), { replace: true });
  }, [authLoading, user, authError, navigate]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const back = (
    <button type="button" className="article-page__back" onClick={() => navigate("/articles")}>
      ← All articles
    </button>
  );

  if (!article) {
    return (
      <div className="article-page">
        {back}
        <h1 className="article-page__title">Article not found</h1>
        <p className="article-page__p">This article doesn't exist or was removed.</p>
      </div>
    );
  }

  return (
    <div className="article-page">
      {back}
      <article className="article-page__article">
        <img className="article-page__cover" src={article.coverUrl} alt="" />
        <h1 className="article-page__title">{article.title}</h1>
        <p className="article-page__meta">
          {article.author} · {prettyDate(article.publishedAt)} · {article.readMinutes} min read ·{" "}
          {article.likes.toLocaleString()} likes
        </p>
        <p className="article-page__lead">{article.description}</p>
        {article.content.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </article>
    </div>
  );
}
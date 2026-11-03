import * as React from "react";
import { articlesApi } from "../services/articleApi";

export type LikeResult = { liked: boolean; likesCount: number };

/** returns the list with one article's like state replaced (use it on every list the article appears in) */
export const patchLike = <T extends { id: string; likedByMe: boolean; likesCount: number }>(
  list: T[],
  id: string,
  r: LikeResult,
): T[] => list.map((a) => (a.id === id ? { ...a, likedByMe: r.liked, likesCount: r.likesCount } : a));

/**
 * Like / unlike one article.
 * - calls the API, then hands the fresh state to `onUpdate` so the parent patches its lists
 * - ignores extra clicks on the same article while its request is still running
 */
export function useToggleLike(
  onUpdate: (id: string, result: LikeResult) => void,
  onError: (e: unknown) => void,
) {
  const pending = React.useRef(new Set<string>());

  return React.useCallback(
    async (id: string) => {
      if (pending.current.has(id)) return;
      pending.current.add(id);
      try {
        onUpdate(id, await articlesApi.toggleLike(id));
      } catch (e) {
        onError(e);
      } finally {
        pending.current.delete(id);
      }
    },
    [onUpdate, onError],
  );
}
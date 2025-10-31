import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPhotos } from "../lib/api";
import type { PicsumPhoto } from "../types";

export function useInfinitePhotos() {
  const [photos, setPhotos] = useState<PicsumPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load next page
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const newData = await fetchPhotos(page, 20);
      if (newData.length === 0) {
        // No more data
        setHasMore(false);
      } else {
        setPhotos(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (err: any) {
      setError(err.message ?? "Error loading photos");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // First load
  useEffect(() => {
    loadMore();
  }, []);

  // Reference for the sentinel div at the bottom of the list
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current) return;
    const el = bottomRef.current;

    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [loadMore]);

  return {
    photos,
    hasMore,
    loading,
    error,
    bottomRef,
  };
}

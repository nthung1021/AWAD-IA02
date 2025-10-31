import { useEffect } from "react";
import PhotoCard from "../components/PhotoCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";

export default function PhotoListPage() {
  const { photos, hasMore, loading, error, bottomRef } = useInfinitePhotos();

  // Push photos to sessionStorage for detail page fast-load
  useEffect(() => {
    const event = new CustomEvent("picsum-cache", { detail: { photos } });
    window.dispatchEvent(event);
  }, [photos]);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* header */}
      <header className="top-0 z-20 bg-gray-900/80 backdrop-blur border-b border-gray-700 px-4 py-6">
        <h1 className="text-5xl font-semibold text-center">
          Picsum Gallery
        </h1>
      </header>

      {/* grid */}
      <section className="flex-1 px-4 py-6">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500 bg-red-900/30 p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map(p => (
              <PhotoCard key={p.id + "_" + p.download_url} photo={p} />
            ))}
        </div>

        {/* end of list / loader */}
        <div ref={bottomRef} />

        {loading && <LoadingSpinner />}

        {!hasMore && !loading && (
          <div className="text-center py-10 text-gray-500 text-sm">
            You reached the end.
          </div>
        )}
      </section>
    </main>
  );
}

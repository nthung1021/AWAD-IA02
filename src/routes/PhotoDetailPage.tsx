import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { GalleryPhoto, PicsumPhoto } from "../types";
import { enrichPhotoData, fetchPhotos } from "../lib/api";

const MAX_PAGES_TO_SEARCH = 10; // Safety limit so we don't loop forever

export default function PhotoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Try to load from sessionStorage cache first (faster UX when navigating from list)
  useEffect(() => {
    if (!id) return;

    const cachedRaw = sessionStorage.getItem("picsum_cache");
    if (cachedRaw) {
      try {
        const cachedList: PicsumPhoto[] = JSON.parse(cachedRaw);
        const match = cachedList.find((p) => p.id === id);
        if (match) {
          setPhoto(enrichPhotoData(match));
          setLoading(false);
          return;
        }
      } catch {
        // ignore parse error
      }
    }

    // Fallback: brute force fetch pages until found or limit reached
    (async () => {
      let page = 1;
      let found: PicsumPhoto | undefined;

      while (page <= MAX_PAGES_TO_SEARCH && !found) {
        const list = await fetchPhotos(page, 100); // Big page to speed up search
        found = list.find(p => p.id === id);
        if (found) break;
        page++;
      }

      if (!found) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPhoto(enrichPhotoData(found));
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex flex-col">
        <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <Link to="/photos" className="text-sm text-gray-300 hover:text-white">
            ← Back
          </Link>
          <h1 className="text-lg font-semibold">Photo Details</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-1 items-center justify-center p-8 text-gray-400 text-sm">
          Loading photo...
        </div>
      </main>
    );
  }

  if (notFound || !photo) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex flex-col">
        <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <Link to="/photos" className="text-sm text-gray-300 hover:text-white">
            ← Back
          </Link>
          <h1 className="text-lg font-semibold">Photo Details</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="text-gray-300 font-semibold">Photo not found</div>
          <Link
            to="/photos"
            className="text-sm text-indigo-400 hover:text-indigo-300 underline"
          >
            Go back to gallery
          </Link>
        </div>
      </main>
    );
  }

  const fullImage = `https://picsum.photos/id/${photo.id}/1200/800`;

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <Link to="/photos" className="text-sm text-gray-300 hover:text-white">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold">Photo Details</h1>
        <div className="w-10" />
      </header>

      <section className="flex-1 px-4 py-6 max-w-5xl w-full mx-auto flex flex-col lg:flex-row gap-6">
        {/* image */}
        <div className="flex-1 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-lg">
          <img
            src={fullImage}
            alt={photo.title}
            className="w-full h-full object-contain bg-black"
          />
        </div>

        {/* meta */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-4">
          <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 shadow">
            <h2 className="text-xl font-semibold text-white break-words">
              {photo.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1 break-words">
              by {photo.author}
            </p>
          </div>

          <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 shadow">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Description
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mt-1 whitespace-pre-wrap break-words">
              {photo.description}
            </p>
          </div>

          <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 shadow text-xs text-gray-400 space-y-1">
            <div>
              <span className="font-medium text-gray-300">Original size:</span>{" "}
              {photo.width} x {photo.height}
            </div>
            <div className="break-all">
              <span className="font-medium text-gray-300">Source URL:</span>{" "}
              {photo.url}
            </div>
            <div className="break-all">
              <span className="font-medium text-gray-300">Download URL:</span>{" "}
              {photo.download_url}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

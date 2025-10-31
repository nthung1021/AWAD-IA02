import { Routes, Route, Navigate } from "react-router-dom";
import PhotoListPage from "./routes/PhotoListPage";
import PhotoDetailPage from "./routes/PhotoDetailPage";
import { useEffect } from "react";
import type { PicsumPhoto } from "./types";

// We’ll mirror photos in sessionStorage so detail page can load instantly.
function usePhotoCacheSync() {
  useEffect(() => {
    const handler = (e: CustomEvent<{ photos: PicsumPhoto[] }>) => {
      sessionStorage.setItem(
        "picsum_cache",
        JSON.stringify(e.detail.photos)
      );
    };
    window.addEventListener("picsum-cache", handler as EventListener);
    return () => {
      window.removeEventListener("picsum-cache", handler as EventListener);
    };
  }, []);
}

export default function App() {
  usePhotoCacheSync();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/photos" replace />} />
      <Route path="/photos" element={<PhotoListPage />} />
      <Route path="/photos/:id" element={<PhotoDetailPage />} />
      <Route path="*" element={<div className="text-white p-8">Not found</div>} />
    </Routes>
  );
}

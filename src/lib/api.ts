import type { PicsumPhoto } from "../types";

const BASE_URL = "https://picsum.photos/v2";

export async function fetchPhotos(page: number, limit = 20): Promise<PicsumPhoto[]> {
  const res = await fetch(`${BASE_URL}/list?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }
  return res.json();
}

/*
 * We don't actually get per-photo metadata like title/description from Picsum,
 * so we'll fake those in the detail page. This keeps UI consistent with the
 * rubric (title/description placeholders).
 */
export function enrichPhotoData(p: PicsumPhoto) {
  return {
    ...p,
    title: `Photo #${p.id}`,
    description:
      "No description provided by API. This is placeholder text for the assignment.",
  };
}

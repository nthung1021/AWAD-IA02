import { Link } from "react-router-dom";
import type { PicsumPhoto } from "../types";

interface PhotoCardProps {
  photo: PicsumPhoto;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const thumbUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <Link
      to={`/photos/${photo.id}`}
      className="group block rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-700 border border-gray-700 shadow-md transition"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-900">
        <img
          src={thumbUrl}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col text-gray-100">
        <span className="text-sm text-gray-400">Author</span>
        <span className="font-medium leading-tight truncate">
          {photo.author}
        </span>
      </div>
    </Link>
  );
}

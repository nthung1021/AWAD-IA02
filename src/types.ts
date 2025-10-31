// Type for one photo item from Picsum
export interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string; // photographer's page on Picsum
  download_url: string; // raw image URL
}

// "Extended" photo model used in the app for details page
export interface GalleryPhoto extends PicsumPhoto {
  title: string;
  description: string;
}

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }

  if (import.meta.env.DEV) {
    return "http://localhost:5173";
  }

  return "https://utazon.fr";
};

export const getCanonicalUrl = (path: string = ""): string => {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
};

export const getOgImageUrl = (
  imagePath: string = "images/og-image.jpg",
): string => {
  const baseUrl = getBaseUrl();
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `${baseUrl}/${cleanPath}`;
};

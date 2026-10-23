export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageCaption: string;
  imageSource?: { label: string; url: string };
  imageFit?: "cover" | "contain";
  source: { label: string; url: string };
  references: { label: string; url: string }[];
  status: "draft" | "published";
  kind:
    | "Research brief"
    | "Professional update"
    | "Education"
    | "LinkedIn post"
    | "LinkedIn mention"
    | "LinkedIn comment";
  editorialNote: string;
  featured?: boolean;
  sourceAuthors?: string[];
  linkedin?: {
    recordId: string;
    type: "Post by Chrys" | "Third-party mention" | "Comment by Chrys";
    access: "Public post" | "Indexed excerpt" | "Comment excerpt";
    originalUrl: string | null;
    discoveryUrl: string | null;
  };
}
export interface ArticleDocument {
  metadata: Article;
  body: string;
}

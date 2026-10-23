import Image from "next/image";
import type { Article } from "@/types/article";

export function ArticleImage({
  article,
  sizes,
  preload = false,
}: {
  article: Article;
  sizes: string;
  preload?: boolean;
}) {
  if (article.imageFit === "contain") {
    return (
      <div className="article-contained-image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          sizes={sizes}
          preload={preload}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }
  return (
    <Image
      src={article.image}
      alt={article.imageAlt}
      fill
      sizes={sizes}
      preload={preload}
    />
  );
}

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
const images = {
  "chrys-microscope": "microscope-gallery.jpg",
  "chrys-portrait": "chrys-dimitriou-portrait.jpg",
  "chrys-consulting": "chrys-dimitriou-gallery.jpg",
  "chrys-surgery": "chrys-dimitriou-ngenuity-surgery.jpg",
  "iris-detail": "iris-detail.jpg",
  "eye-imaging": "eye-segmentation-analysis.jpg",
  "glaucoma-care": "glaucoma-original.jpg",
  "laser-treatment": "glaucoma-laser-original.jpg",
  "glaucoma-stent": "glaucoma-stent-original.jpg",
  "igleams-technology": "igleams-symposium.jpg",
};
// Article sources and provenance are kept together in the editable inventory.
const articleImages = JSON.parse(
  await fs.readFile("docs/article-images.json", "utf8"),
);
for (const article of articleImages.images) {
  if (article.sourceFile.startsWith("public/images/source/")) {
    images[path.basename(article.image, ".webp")] = article.sourceFile.replace(
      "public/images/source/",
      "",
    );
  }
}
const widths = [320, 480, 768, 1200, 1600];
const output = "public/images";
for (const [name, filename] of Object.entries(images)) {
  const input = path.join(output, "source", filename);
  for (const width of widths) {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(output, `${name}-${width}.webp`));
  }
  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(output, `${name}.webp`));
}
// Social previews use a conventional JPEG, also readable by clients without WebP support.
await sharp(path.join(output, "source/chrys-dimitriou-about.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88 })
  .toFile(path.join(output, "social-card.jpg"));
await sharp(path.join(output, "source/original-favicon.png"))
  .resize(64, 64)
  .png()
  .toFile("src/app/icon.png");
const sizes = await Promise.all(
  Object.keys(images).map(async (name) => ({
    name,
    bytes: (await fs.stat(path.join(output, `${name}.webp`))).size,
  })),
);
console.log(JSON.stringify(sizes, null, 2));

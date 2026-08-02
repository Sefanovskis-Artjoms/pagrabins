import path from "node:path";
import sharp from "sharp";

const sizeCache = new Map<string, { width: number; height: number }>();

export async function getGalleryImageSize(file: string) {
  const cached = sizeCache.get(file);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "public/gallery", file);
  const { width, height } = await sharp(filePath).metadata();

  if (!width || !height) {
    throw new Error(`Could not read dimensions for gallery image: ${file}`);
  }

  const size = { width, height };
  sizeCache.set(file, size);
  return size;
}

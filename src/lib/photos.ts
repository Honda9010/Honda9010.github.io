import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Adapted from Astro Photo Folio's responsive WebP pipeline.
const widths = [480, 800, 1200, 1600, 2200];

export async function renderPhoto(src: ImageMetadata) {
  const cap = Math.min(src.width, Math.round(2200 * Math.min(1, src.width / src.height)));
  const renditions = await Promise.all(
    [...widths.filter((width) => width < cap), cap].map((width) =>
      getImage({ src, width, format: 'webp', quality: 80 }),
    ),
  );

  return {
    src: renditions[Math.min(1, renditions.length - 1)].src,
    srcset: renditions.map((rendered) => `${rendered.src} ${rendered.attributes.width}w`).join(', '),
    full: renditions[renditions.length - 1].src,
  };
}

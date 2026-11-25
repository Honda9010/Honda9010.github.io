import { readdir, readFile, rm } from 'node:fs/promises';
import { basename, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Adapted from Astro Photo Folio. Restrict cleanup to Astro's generated asset
// directory so the old site's public archive is copied in full.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const assets = join(dist, '_astro');
const photoFile = /\.(jpe?g|png|webp|avif|gif|tiff?)$/i;
const textFile = /\.(html|css|js|mjs|json|xml)$/i;

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : path;
  }))).flat();
}

const files = await listFiles(dist);
const buildText = (await Promise.all(files.filter((path) => textFile.test(path)).map((path) => readFile(path, 'utf8')))).join('\n');
const unusedPhotos = files.filter((path) => (
  path.startsWith(`${assets}${sep}`) && photoFile.test(path) && !buildText.includes(basename(path))
));
await Promise.all(unusedPhotos.map((path) => rm(path)));
console.log(`Removed ${unusedPhotos.length} unreferenced generated photo files.`);

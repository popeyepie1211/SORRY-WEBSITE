import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const folder = join(process.cwd(), 'public', 'photos');
const files = (await readdir(folder)).filter((name) => /\.(avif|webp|png|jpe?g)$/i.test(name)).sort();
const paths = files.map((name) => `/photos/${encodeURIComponent(name)}`);
await writeFile(join(process.cwd(), 'src', 'generatedPhotos.ts'), `// Generated from public/photos by scripts/generate-photo-manifest.mjs.\nexport const generatedPhotoPaths: string[] = ${JSON.stringify(paths, null, 2)};\n`);

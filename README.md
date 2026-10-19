# For Bhumi

A cinematic, scroll driven letter from Arya to Bhumi. Built with React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, Lenis, React Three Fiber, Howler, Lottie, and canvas-confetti.

## Run it

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production output:

```bash
npm run build
npm run preview
```

The build output is in `dist/`.

## Make it personal

All scene copy, captions, dates, photo details, and the music path are in [`src/content.ts`](src/content.ts). Search for `TODO: REPLACE` to find details still needing a true personal memory. The anniversary is set to **5 February 2024**. The site deliberately does not claim a number of calm days or a particular method for handling overthinking.

### Photos

Put `.avif`, `.webp`, `.jpg`, or `.png` photos in `public/photos/`. A manifest is generated automatically before `npm run dev` and `npm run build`. Filenames containing `solo` or `bhumi` are placed in the "Just you" scene; other photos enter the horizontal gallery. Use a filename like `bhumi-solo-01.webp` for a portrait. With no photos, the site shows clearly labeled placeholders.

Set each photo's caption, date, alt text, and focal point in the `photoDetails` map in `src/content.ts`, keyed by its filename. You can also add a `srcSet` string for responsive WebP/AVIF variants. Example:

```ts
const photoDetails: Record<string, Partial<Photo>> = {
  'ramashraya.webp': {
    caption: 'Dosa at Ramashraya, with you across the table.',
    date: 'February 2024',
    alt: 'Arya and Bhumi at Ramashraya',
    focalPoint: '50% 42%',
    srcSet: '/photos/ramashraya-640.webp 640w, /photos/ramashraya-1200.webp 1200w',
  },
};
```

Keep variant files out of the auto gallery by placing them in a subfolder such as `public/photos/variants/`; the main photo path still comes from the top level. Images are lazy loaded and shown against a gradient while they decode.

### Music

Put an audio file you own or have permission to use at `public/audio/song.mp3`. Then set `content.audio.available` to `true` in `src/content.ts`. Playback begins only after the opening tap, fades in, and can be toggled. Until the file is added, the music button stays disabled and the site makes no missing file request.

## Deploy to Vercel

Import this folder as a Vite project in Vercel. Use `npm run build` for the build command and `dist` for the output directory. No environment variables are required. For another static host, upload `dist/`.

## Accessibility and motion

The story works with reduced motion. Buttons and dialogs are keyboard operable; photo viewer arrow keys move between images and Escape closes it. The heartbeat vibration is opt in. Animations pause or simplify where supported on low motion devices.

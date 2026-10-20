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

All scene copy, captions, dates, photo details, and the music path are in [`src/content.ts`](src/content.ts). The anniversary is set to **5 February 2024**. The letter centers Arya's love for Bhumi, their shared memories, his hope that she stays, and his commitment to keep growing.

### Photos and videos

The 13 supplied photos are included as WebP files in `public/photos/`, with smaller responsive copies in `public/photos/variants/`. `bhumi-bhondlu.webp` shows Bhumi with BHONDLU, her white duck soft toy. The four current clips are included in `public/videos/` with poster frames. They play only when tapped, one at a time; background music lowers while a video plays. The Site is private because these are personal memories.

To add more photos, put `.avif`, `.webp`, `.jpg`, or `.png` files in `public/photos/`. A manifest is generated automatically before `npm run dev` and `npm run build`. Filenames containing `solo` or `bhumi` enter the "Just you" scene. The featured horizontal gallery is curated through `galleryOrder` in `src/content.ts`.

Set each photo's caption, date, alt text, and focal point in the `photoDetails` map in `src/content.ts`, keyed by its filename. You can also add a `srcSet` string for responsive WebP/AVIF variants. Example:

```ts
const photoDetails: Record<string, Partial<Photo>> = {
  'new-photo.webp': {
    caption: 'A little moment I keep close.',
    date: 'February 2024',
    alt: 'Arya and Bhumi together',
    focalPoint: '50% 42%',
    srcSet: '/photos/variants/new-photo.webp 480w, /photos/new-photo.webp 960w',
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

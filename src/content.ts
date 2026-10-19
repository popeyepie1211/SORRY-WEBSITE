import { generatedPhotoPaths } from './generatedPhotos';

export type Photo = { src: string | null; srcSet?: string; caption: string; date: string; focalPoint: string; alt: string; kind: 'couple' | 'solo' };
export type MemoryVideo = { src: string; poster: string; caption: string; alt: string };
export type AccountabilityCard = { title: string; body: string; icon: 'voice' | 'cloud' | 'trust' | 'home' };
export type Milestone = { title: string; body: string };
export type Reason = { front: string; back: string };

const responsive = (name: string, width: number) => `/photos/variants/${name} 480w, /photos/${name} ${width}w`;
const photoDetails: Record<string, Partial<Photo>> = {
  'us-sunset.webp': { kind: 'couple', caption: 'Us in the orange light.', alt: 'Arya and Bhumi together in warm sunset light', focalPoint: '50% 45%', srcSet: responsive('us-sunset.webp', 960) },
  'us-restaurant.webp': { kind: 'couple', caption: 'A table, steel cups, and us.', alt: 'Arya and Bhumi sitting together at a restaurant table', focalPoint: '50% 50%', srcSet: responsive('us-restaurant.webp', 960) },
  'bhumi-shy-smile.webp': { kind: 'solo', caption: 'The way you hide your smile behind your hands.', alt: 'Bhumi peeking over her hands at a table', focalPoint: '50% 34%', srcSet: responsive('bhumi-shy-smile.webp', 960) },
  'bhumi-silly-face.webp': { kind: 'solo', caption: 'This face. I love this face.', alt: 'Bhumi making a playful face for the camera', focalPoint: '50% 30%', srcSet: responsive('bhumi-silly-face.webp', 959) },
  'bhumi-soft-toys.webp': { kind: 'solo', caption: 'The little world of soft toys that reminds me of BHONDLU.', alt: 'Bhumi holding plush toys in a shop', focalPoint: '56% 48%', srcSet: responsive('bhumi-soft-toys.webp', 720) },
  'bhumi-flowers.webp': { kind: 'solo', caption: 'You and those bright red flowers.', alt: 'Bhumi holding a bouquet of vivid red flowers', focalPoint: '50% 59%', srcSet: responsive('bhumi-flowers.webp', 960) },
  'bhumi-snack.webp': { kind: 'solo', caption: 'You, caught in a little food moment.', alt: 'Bhumi taking a bite of a snack', focalPoint: '50% 40%', srcSet: responsive('bhumi-snack.webp', 723) },
  'bhumi-night.webp': { kind: 'solo', caption: 'A quiet moment with you in the city lights.', alt: 'Bhumi sitting outside at night under city lights', focalPoint: '50% 42%', srcSet: responsive('bhumi-night.webp', 960) },
  'bhumi-mirror.webp': { kind: 'solo', caption: 'You in a room full of pink.', alt: 'Bhumi taking a mirror photo in a pink room', focalPoint: '50% 50%', srcSet: responsive('bhumi-mirror.webp', 718) },
  'bhumi-mango.webp': { kind: 'solo', caption: 'The candid moments I keep close.', alt: 'Bhumi taking a bite of fruit', focalPoint: '50% 34%', srcSet: responsive('bhumi-mango.webp', 960) },
  'bhumi-closeup.webp': { kind: 'solo', caption: 'That little smile when you look down.', alt: 'Close-up of Bhumi smiling while looking down', focalPoint: '50% 32%', srcSet: responsive('bhumi-closeup.webp', 720) },
  'bhumi-platform.webp': { kind: 'solo', caption: 'Every ordinary day with you becomes a memory.', alt: 'Bhumi standing on a train platform', focalPoint: '62% 43%', srcSet: responsive('bhumi-platform.webp', 960) },
};
const photoOrder = ['us-sunset.webp', 'us-restaurant.webp', 'bhumi-shy-smile.webp', 'bhumi-silly-face.webp', 'bhumi-soft-toys.webp', 'bhumi-flowers.webp', 'bhumi-snack.webp', 'bhumi-night.webp', 'bhumi-mirror.webp', 'bhumi-mango.webp', 'bhumi-closeup.webp', 'bhumi-platform.webp'];
const galleryOrder = ['us-sunset.webp', 'us-restaurant.webp', 'bhumi-shy-smile.webp', 'bhumi-soft-toys.webp', 'bhumi-flowers.webp', 'bhumi-night.webp'];
const loadedPhotos: Photo[] = generatedPhotoPaths.map((src, index) => {
  const name = decodeURIComponent(src.split('/').pop() ?? 'photo');
  const kind: Photo['kind'] = /solo|bhumi/i.test(name) ? 'solo' : 'couple';
  return {
    src,
    srcSet: undefined,
    caption: kind === 'solo' ? 'The light finds you everywhere.' : 'A little moment I keep close.',
    date: '',
    focalPoint: 'center',
    alt: kind === 'solo' ? `Portrait of Bhumi, photo ${index + 1}` : `A memory of Arya and Bhumi, photo ${index + 1}`,
    kind,
    ...photoDetails[name],
  };
}).sort((a, b) => {
  const rank = (photo: Photo) => {
    const index = photoOrder.indexOf(decodeURIComponent(photo.src?.split('/').pop() ?? ''));
    return index < 0 ? photoOrder.length : index;
  };
  return rank(a) - rank(b);
});

export const content = {
  siteTitle: 'For Bhumi',
  ui: {
    loading: 'Gathering a little light', begin: 'Tap to begin', scroll: 'Scroll to feel the story',
    musicOn: 'Mute music', musicOff: 'Play music', musicUnavailable: 'Add a song to hear music',
    close: 'Close', showLetter: 'Show the full letter', openLetter: 'Open the letter',
    flipReason: 'Tap to turn over', photoPlaceholder: 'ADD PHOTO HERE', photoOpen: 'Open photo', photoPrevious: 'Previous photo', photoNext: 'Next photo',
    musicOnLabel: 'ON', musicOffLabel: 'OFF',
    videoPlay: 'Play video', videoHeading: 'Little moving moments', videoIntro: 'Some memories are better left moving.',
    soloPrevious: 'Previous portrait', soloNext: 'Next portrait',
    pause: 'Feel the heartbeat', vibrationOff: 'Turn vibration off',
    addAnniversary: 'Add our anniversary date to begin the count',
    days: 'days since we became us',
    hiddenMessage: 'A hidden message', heartSecretHint: 'Heart. Tap five times for a hidden message', letterRegion: "Arya's letter to Bhumi",
  },
  gate: { eyebrow: 'A LETTER IN MOTION', title: 'Bhumi, this is for you.', note: 'From Arya, with all my heart.' },
  opening: { eyebrow: '01 / THE BEGINNING', lines: ['Hey Bhumi...', 'I made this for you.', 'Please read it till the end.'] },
  apology: {
    eyebrow: '02 / THE TRUTH', title: "I'm sorry.",
    paragraphs: [
      "I'm sorry, Bhumi.",
      "I was rude to you. I picked fights over things that were never real. I let my mind build stories about things you never did, and then I made you pay for them. You didn't deserve that. You were loving me honestly, and I answered with suspicion and a sharp tongue.",
      "I'm not saying this to make excuses. My overthinking is mine to deal with, not yours to absorb. Every time I raised my voice or said something cold, I was hurting the one person who only ever wanted peace with me.",
      "I'm sorry for every fight I started. I'm sorry for every time you felt like you had to prove yourself to me. You never had to.",
    ],
  },
  accountability: {
    eyebrow: '03 / OWNING IT', title: 'I know what I did.',
    cards: [
      { icon: 'voice', title: 'I was rude to you', body: "I spoke to you in ways I would never want spoken to me. I know my tone made you feel small and tired. You deserved patience and kindness, and I'm sorry I didn't give you that." },
      { icon: 'cloud', title: 'I fought over things you never did', body: "I let my mind invent problems, then treated them like facts. You were left defending yourself against things that only existed in my head. That wasn't fair to you." },
      { icon: 'trust', title: "I didn't trust what you showed me", body: 'You showed me your love again and again, and I still doubted it. Doubting you hurt you more than anything. I understand now that trust is something I have to choose, not something you have to keep earning.' },
      { icon: 'home', title: 'I made love feel like a battlefield', body: 'A relationship should feel like home. I turned it into something you had to brace for. I never want you to feel that again.' },
    ] as AccountabilityCard[],
  },
  growth: {
    eyebrow: '04 / LEARNING TO GROW', title: "I'm not who I was. I'm working on who I'm becoming.",
    milestones: [
      { title: 'I pause before I react.', body: 'When a thought starts spiraling, I stop and ask: “Did she actually do this, or is my mind making it up?”' },
      { title: 'I talk to you instead of assuming.', body: 'If something bothers me, I will ask you calmly instead of accusing.' },
      { title: "I'm working on my overthinking.", body: "I don't have this figured out yet. I'm trying to notice when my mind invents things, and it's my responsibility to learn how to respond without hurting you." },
      { title: 'A promise.', body: 'I will never again punish you for something I only imagined.' },
    ] as Milestone[],
    tagline: "I'm not perfect, but I'm trying every single day, for you.",
  },
  memories: {
    eyebrow: '05 / THE LIGHT WE KNOW', title: 'Us, in all the little moments.',
    intro: 'Some moments stay with me, even when the world goes quiet.',
    soloTitle: 'Just you.', soloLine: 'You are the most beautiful thing in my life.',
    photos: loadedPhotos.length ? loadedPhotos.filter((photo) => galleryOrder.includes(decodeURIComponent(photo.src?.split('/').pop() ?? ''))) : [
      { src: null, caption: 'Dosa at Ramashraya, and you across the table.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
      { src: null, caption: 'Sitting at Runwals, just yapping forever.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
      { src: null, caption: 'Our little world with BHONDLU.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
    ] as Photo[],
    soloPhotos: loadedPhotos.filter((photo) => photo.kind === 'solo'),
    videos: [
      { src: '/videos/moment-01.mp4', poster: '/videos/posters/moment-01.webp', caption: 'A little piece of you I saved.', alt: 'Saved screen recording of a short Bhumi video' },
      { src: '/videos/moment-02.mp4', poster: '/videos/posters/moment-02.webp', caption: 'One of those clips I could watch again and again.', alt: 'Saved screen recording of Bhumi smiling on camera' },
      { src: '/videos/moment-03.mp4', poster: '/videos/posters/moment-03.webp', caption: 'A little piece of our conversations.', alt: 'Saved screen recording of a conversation and a Bhumi video' },
      { src: '/videos/moment-04.mp4', poster: '/videos/posters/moment-04.webp', caption: 'Just you, being you.', alt: 'Video of Bhumi showing her outfit' },
      { src: '/videos/moment-05.mp4', poster: '/videos/posters/moment-05.webp', caption: 'A moment together on the stairs.', alt: 'Video of Arya and Bhumi together on stairs' },
    ] as MemoryVideo[],
  },
  reasons: {
    eyebrow: '06 / THE THINGS I LOVE', title: 'Why I love you.',
    cards: [
      // TODO: REPLACE this bracketed moment with a true, specific memory of her patience.
      { front: 'Your patience', back: "You stayed calm when I didn't deserve it. [ADD A SPECIFIC MOMENT]" },
      { front: 'Your smile', back: 'It can fix my worst day in a second. I think of us over dosa at Ramashraya.' },
      { front: 'Your heart', back: 'You love honestly and deeply. I feel it in our endless yapping at Runwals.' },
      { front: 'How you make me feel', back: 'Safe. At home. Like the best version of myself is possible.' },
      { front: 'Haggumaster', back: 'Even that silly name feels like a little world that belongs only to us. And so does BHONDLU.' },
      { front: 'Us', back: 'Even after everything, I still choose you.' },
    ] as Reason[],
    anniversaryDate: '2024-02-05' as string | null,
  },
  heartbeat: {
    eyebrow: '07 / ONLY YOU', lines: ["No matter what, it's always been you.", "I'm not going anywhere.", "I'm here. Only for you, Bhumi."],
    secret: 'I love you more than I know how to say. Even on my worst days, you were my best thing. - Arya',
  },
  letter: {
    eyebrow: '08 / A LETTER FOR YOU', title: 'The words I needed to say.', seal: 'B & A',
    text: `Bhumi,\n\nI've started this letter many times, and every version was too small for what I feel. So I'll just be honest.\n\nI hurt you. I was rude, I kept fighting, and I let my overthinking turn into accusations about things you never did. You gave me patience I didn't deserve, and I gave you stress in return. I'm so sorry.\n\nI've had a lot of time to think, and I finally understand something. The problem was never you. It was the noise in my own head, and it was my job to handle it, not yours to survive it. I'm learning to do that now. I'm learning to pause, to breathe, and to trust what I can see: that you love me, and that you've always been on my side.\n\nI'm not asking you to forget what happened. I'm asking for a chance to show you who I'm becoming. You are my peace, my home, my Earth. I want to grow beside you, not tear down what we built.\n\nWhatever you decide, I want you to know I mean every word.\n\nForever yours,\nArya`,
    signature: 'Arya',
  },
  question: {
    eyebrow: '09 / THE DAWN', title: 'Bhumi, will you give me one more chance?',
    yes: 'Yes ❤️', time: 'I need time',
    timeAnswer: "That's okay. Take all the time you need. I'll wait, and I'll keep showing you.",
    yesAnswer: 'Thank you, Bhumi. I promise to never make you regret it.',
    finalLine: 'I love you. Always. - Arya',
  },
  audio: {
    // TODO: REPLACE: add a licensed or personally owned song at public/audio/song.mp3, then set available to true.
    src: '/audio/song.mp3', available: false, baseVolume: 0.24,
  },
} as const;

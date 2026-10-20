import { generatedPhotoPaths } from './generatedPhotos';

export type Photo = { src: string | null; srcSet?: string; caption: string; date: string; focalPoint: string; alt: string; kind: 'couple' | 'solo' };
export type MemoryVideo = { src: string; poster: string; caption: string; alt: string };
export type AccountabilityCard = { title: string; body: string; icon: 'voice' | 'cloud' | 'trust' | 'home' };
export type Milestone = { title: string; body: string };
export type Reason = { front: string; back: string };

const responsive = (name: string, width: number) => `/photos/variants/${name} 480w, /photos/${name} ${width}w`;
const photoDetails: Record<string, Partial<Photo>> = {
  'us-sunset.webp': { kind: 'couple', caption: "The sunset was beautiful. You were the part I couldn't stop looking at.", alt: 'Arya and Bhumi together in warm sunset light', focalPoint: '50% 45%', srcSet: responsive('us-sunset.webp', 960) },
  'us-restaurant.webp': { kind: 'couple', caption: "I love how beautiful you look when we're just being us.", alt: 'Arya and Bhumi sitting together at a restaurant table', focalPoint: '50% 50%', srcSet: responsive('us-restaurant.webp', 960) },
  'bhumi-shy-smile.webp': { kind: 'solo', caption: 'Even when you hide your smile, I still see how beautiful you are.', alt: 'Bhumi peeking over her hands at a table', focalPoint: '50% 34%', srcSet: responsive('bhumi-shy-smile.webp', 960) },
  'bhumi-silly-face.webp': { kind: 'solo', caption: 'Even your silliest faces are beautiful to me.', alt: 'Bhumi making a playful face for the camera', focalPoint: '50% 30%', srcSet: responsive('bhumi-silly-face.webp', 959) },
  'bhumi-soft-toys.webp': { kind: 'solo', caption: "Even among all those soft toys, you're the one I couldn't look away from.", alt: 'Bhumi holding plush toys in a shop', focalPoint: '56% 48%', srcSet: responsive('bhumi-soft-toys.webp', 720) },
  'bhumi-bhondlu.webp': { kind: 'solo', caption: 'That smile with BHONDLU in your arms is so beautiful to me.', alt: 'Bhumi smiling while holding BHONDLU, a white duck soft toy', focalPoint: '50% 42%', srcSet: responsive('bhumi-bhondlu.webp', 720) },
  'bhumi-flowers.webp': { kind: 'solo', caption: 'The flowers were lovely. You were the loveliest part of the day.', alt: 'Bhumi holding a bouquet of vivid red flowers', focalPoint: '50% 59%', srcSet: responsive('bhumi-flowers.webp', 960) },
  'bhumi-snack.webp': { kind: 'solo', caption: 'I love how beautiful you are in the moments you never pose for.', alt: 'Bhumi taking a bite of a snack', focalPoint: '50% 40%', srcSet: responsive('bhumi-snack.webp', 723) },
  'bhumi-night.webp': { kind: 'solo', caption: 'The city lights had nothing on how beautiful you looked.', alt: 'Bhumi sitting outside at night under city lights', focalPoint: '50% 42%', srcSet: responsive('bhumi-night.webp', 960) },
  'bhumi-mirror.webp': { kind: 'solo', caption: 'That mirror caught a glimpse of how beautiful you are.', alt: 'Bhumi taking a mirror photo in a pink room', focalPoint: '50% 50%', srcSet: responsive('bhumi-mirror.webp', 718) },
  'bhumi-mango.webp': { kind: 'solo', caption: 'You look beautiful even in the little candid moments.', alt: 'Bhumi taking a bite of fruit', focalPoint: '50% 34%', srcSet: responsive('bhumi-mango.webp', 960) },
  'bhumi-closeup.webp': { kind: 'solo', caption: 'That little smile is the prettiest thing I know.', alt: 'Close-up of Bhumi smiling while looking down', focalPoint: '50% 32%', srcSet: responsive('bhumi-closeup.webp', 720) },
  'bhumi-platform.webp': { kind: 'solo', caption: 'You make even an ordinary platform look beautiful.', alt: 'Bhumi standing on a train platform', focalPoint: '62% 43%', srcSet: responsive('bhumi-platform.webp', 960) },
};
const photoOrder = ['us-sunset.webp', 'us-restaurant.webp', 'bhumi-shy-smile.webp', 'bhumi-silly-face.webp', 'bhumi-soft-toys.webp', 'bhumi-bhondlu.webp', 'bhumi-flowers.webp', 'bhumi-snack.webp', 'bhumi-night.webp', 'bhumi-mirror.webp', 'bhumi-mango.webp', 'bhumi-closeup.webp', 'bhumi-platform.webp'];
const galleryOrder = ['us-sunset.webp', 'us-restaurant.webp', 'bhumi-shy-smile.webp', 'bhumi-bhondlu.webp', 'bhumi-flowers.webp', 'bhumi-night.webp'];
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
    videoPlay: 'Play video', videoHeading: 'Little moments on repeat', videoIntro: 'A few seconds I never want to forget.',
    soloPrevious: 'Previous portrait', soloNext: 'Next portrait',
    pause: 'Feel the heartbeat', vibrationOff: 'Turn vibration off',
    addAnniversary: 'Add our anniversary date to begin the count',
    days: 'days since we became us',
    hiddenMessage: 'A hidden message', heartSecretHint: 'Heart. Tap five times for a hidden message', letterRegion: "Arya's letter to Bhumi",
  },
  gate: { eyebrow: 'A LETTER IN MOTION', title: 'Bhumi, this is for you.', note: 'From Arya, with all my heart.' },
  opening: { eyebrow: '01 / THE BEGINNING', lines: ['Hey Bhumi...', 'I love you.', 'I hope we keep choosing each other.'] },
  apology: {
    eyebrow: '02 / FROM MY HEART', title: "I'm sorry.",
    paragraphs: [
      "Bhumi, I'm sorry.",
      "I know I was rude and turned small things into arguments. You did not deserve to be spoken to that way. I'm sorry for the hurt I caused you.",
      "I love you so much. I want my actions to make that love feel gentle and safe. I cannot undo those moments, but I can own them and become better.",
    ],
  },
  accountability: {
    eyebrow: '03 / FOR US', title: 'I want to be good to you.',
    cards: [
      { icon: 'voice', title: 'I want to listen', body: 'Your feelings matter to me. I want to hear you fully, even when a conversation is hard, and answer with care.' },
      { icon: 'cloud', title: 'I want to bring you peace', body: 'I want our time together to have more ease, more laughter, and room for both of us to be ourselves.' },
      { icon: 'trust', title: 'I want to earn your trust', body: 'I know trust grows through what I do. I want my words and actions to be steady, honest, and kind.' },
      { icon: 'home', title: 'I want us to feel at home', body: 'You are the person I want beside me on ordinary days and big days. I want being together to feel good for both of us.' },
    ] as AccountabilityCard[],
  },
  growth: {
    eyebrow: '04 / GROWING WITH YOU', title: 'I will keep growing for us.',
    milestones: [
      { title: 'Pause, then speak with care.', body: 'I want to slow down when I feel upset, so I can speak to you with the kindness you deserve.' },
      { title: 'Listen all the way through.', body: "I'll ask, listen, and try to understand you before I respond. I want us to be able to talk openly." },
      { title: 'Keep working on myself.', body: "I don't have my overthinking figured out yet. I'm trying, and I will keep learning to handle my thoughts without putting them on you." },
      { title: 'Show up every day.', body: 'I want you to see change in small, consistent ways: patience in my words, respect in our conversations, and care in how I treat you.' },
    ] as Milestone[],
    tagline: 'I want to be a better person, and a better partner to you.',
  },
  memories: {
    eyebrow: '05 / OUR LITTLE WORLD', title: 'All the little ways I love us.',
    intro: 'Every little moment with you feels worth keeping.',
    soloTitle: 'Just you.', soloLine: 'You are the most beautiful thing in my life.',
    photos: loadedPhotos.length ? loadedPhotos.filter((photo) => galleryOrder.includes(decodeURIComponent(photo.src?.split('/').pop() ?? ''))) : [
      { src: null, caption: 'Dosa at Ramashraya, and you across the table.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
      { src: null, caption: 'Sitting at Runwals, just yapping forever.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
      { src: null, caption: 'Our little world with BHONDLU.', date: '', focalPoint: 'center', alt: 'Photo placeholder for Arya and Bhumi', kind: 'couple' },
    ] as Photo[],
    soloPhotos: loadedPhotos.filter((photo) => photo.kind === 'solo'),
    videos: [
      { src: '/videos/moment-01.mp4', poster: '/videos/posters/moment-01.webp', caption: 'I love that little smile of yours.', alt: 'Bhumi smiling softly by a window' },
      { src: '/videos/moment-02.mp4', poster: '/videos/posters/moment-02.webp', caption: 'You look beautiful in every little glance.', alt: 'Bhumi looking into the camera in a blue patterned top' },
      { src: '/videos/moment-03.mp4', poster: '/videos/posters/moment-03.webp', caption: 'I love how we look together.', alt: 'Arya and Bhumi sharing a close moment together' },
      { src: '/videos/moment-04.mp4', poster: '/videos/posters/moment-04.webp', caption: 'Even a car ride looks lovely with you in it.', alt: 'Bhumi smiling in a car' },
    ] as MemoryVideo[],
  },
  reasons: {
    eyebrow: '06 / THE THINGS I LOVE', title: 'Why I love you.',
    cards: [
      { front: 'Your smile', back: 'Whether we are sharing dosa at Ramashraya or doing nothing at all, your smile is still my favourite sight.' },
      { front: 'Our endless talks', back: 'I love sitting at Runwals with you and yapping until we forget the time.' },
      { front: 'Your heart', back: 'Seeing you smile with BHONDLU in your arms is one of my favourite memories of you.' },
      { front: 'How you make me feel', back: 'Life feels brighter and more like home when I am with you.' },
      { front: 'Haggumaster', back: 'That little name makes me smile every time. It sounds like us: silly, close, and entirely our own.' },
      { front: 'Our future', back: 'I want more ordinary days with you, more laughter, more learning, and more reasons to choose each other.' },
    ] as Reason[],
    anniversaryDate: '2024-02-05' as string | null,
  },
  heartbeat: {
    eyebrow: '07 / ONLY YOU', lines: ["Since 5 February 2024, you've been my favourite person.", 'I love you in all our little moments.', "I hope you'll stay with me, Bhumi."],
    secret: 'More dosa dates, more Runwals yapping, more silly names and quiet days. I want all of it with you. - Arya',
  },
  letter: {
    eyebrow: '08 / A LETTER FOR YOU', title: 'I love you, Bhumi.', seal: 'B & A',
    text: `Bhumi,\n\nSince 5 February 2024, you have made my life warmer and more beautiful. I keep thinking about dosa at Ramashraya, the way we can sit at Runwals and keep yapping, your smile when BHONDLU is in your arms, and how even calling you Haggumaster feels like a little world that is just ours.\n\nI love you. I love your smile, your heart, and the ordinary moments that become my favourite memories because you are in them. I want more days beside you: sharing food, laughing at nothing, listening to you, and finding our way through life together.\n\nI know I have hurt you with my words and reactions. I am sorry. You deserved gentleness from me, and I am responsible for doing better. I do not have everything figured out, but I am trying to become calmer, kinder, and more thoughtful. I want you to see that in my actions, not just read it here.\n\nI want you to stay with me, Bhumi. I want to keep loving you and growing with you. I hope we can keep choosing each other while I keep working to be the person and partner you deserve.\n\nWhatever you need to decide, I will respect it. I love you so much.\n\nYours,\nArya`,
    signature: 'Arya',
  },
  question: {
    eyebrow: '09 / THE DAWN', title: 'Bhumi, will you stay with me?',
    yes: 'Yes ❤️', time: 'I need time',
    timeAnswer: "Take the time you need. I love you, and I'll respect what you decide.",
    yesAnswer: "Thank you, Bhumi. I love you, and I'll keep working to be better for us.",
    finalLine: 'More little moments, together. Love, Arya',
  },
  audio: {
    // TODO: REPLACE: add a licensed or personally owned song at public/audio/song.mp3, then set available to true.
    src: '/audio/song.mp3', available: false, baseVolume: 0.24,
  },
} as const;

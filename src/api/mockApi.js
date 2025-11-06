// ✨ UPDATE: Expanded the artworks array with 11 new pieces.

const artworks = [
  { id: 1, title: 'Sonata of Colors', artist: 'Elara Vance', imageUrl: 'https://picsum.photos/seed/p1/600/800', price: 1200, style: 'Abstract' },
  { id: 2, title: 'Metropolitan Haze', artist: 'Julian Cross', imageUrl: 'https://picsum.photos/seed/p2/600/800', price: 1850, style: 'Modern' },
  { id: 3, title: 'Whispers of Terra', artist: 'Aria Chen', imageUrl: 'https://picsum.photos/seed/p3/600/800', price: 750, style: 'Impressionism' },
  { id: 4, title: 'Echoes of Silence', artist: 'John Doe', imageUrl: 'https://picsum.photos/seed/g/400/300', price: 450, style: 'Abstract' },
  { id: 5, title: 'Digital Bloom', artist: 'Jane Smith', imageUrl: 'https://picsum.photos/seed/h/400/300', price: 2100, style: 'Modern' },
  { id: 6, title: 'Future Past', artist: 'Alex Ray', imageUrl: 'https://picsum.photos/seed/i/400/300', price: 980, style: 'Abstract' },
  { id: 7, title: 'Neon Dreams', artist: 'Mia Wallace', imageUrl: 'https://picsum.photos/seed/j/400/300', price: 2500, style: 'Modern' },
  { id: 8, title: 'Concrete Jungle', artist: 'Leo Kim', imageUrl: 'https://picsum.photos/seed/k/400/300', price: 320, style: 'Impressionism' },
  { id: 9, title: 'Solar Flare', artist: 'Sara Tonin', imageUrl: 'https://picsum.photos/seed/l/400/300', price: 1500, style: 'Abstract' },
  // ✨ NEW art pieces start here
  { id: 10, title: 'Oceanic Pulse', artist: 'Derek Hale', imageUrl: 'https://picsum.photos/seed/ocean/600/800', price: 880, style: 'Abstract' },
  { id: 11, title: 'The Gilded Cage', artist: 'Nina Petrova', imageUrl: 'https://picsum.photos/seed/cage/600/800', price: 3200, style: 'Modern' },
  { id: 12, title: 'Fading Memories', artist: 'Aria Chen', imageUrl: 'https://picsum.photos/seed/memories/600/800', price: 650, style: 'Impressionism' },
  { id: 13, title: 'Chromatic Aberration', artist: 'Julian Cross', imageUrl: 'https://picsum.photos/seed/chromatic/600/800', price: 1950, style: 'Modern' },
  { id: 14, title: 'City of Glass', artist: 'Leo Kim', imageUrl: 'https://picsum.photos/seed/glass/600/800', price: 2800, style: 'Modern' },
  { id: 15, title: 'Verdant Growth', artist: 'Elara Vance', imageUrl: 'https://picsum.photos/seed/verdant/600/800', price: 1100, style: 'Abstract' },
  { id: 16, title: 'Pastel Mornings', artist: 'Sara Tonin', imageUrl: 'https://picsum.photos/seed/pastel/600/800', price: 420, style: 'Impressionism' },
  { id: 17, title: 'Industrial Heart', artist: 'John Doe', imageUrl: 'https://picsum.photos/seed/industrial/600/800', price: 1600, style: 'Modern' },
  { id: 18, title: 'Rhapsody in Blue', artist: 'Julian Cross', imageUrl: 'https://picsum.photos/seed/rhapsody/600/800', price: 2200, style: 'Abstract' },
  { id: 19, title: 'Silent Observer', artist: 'Nina Petrova', imageUrl: 'https://picsum.photos/seed/observer/600/800', price: 950, style: 'Impressionism' },
  { id: 20, title: 'Cosmic Drift', artist: 'Alex Ray', imageUrl: 'https://picsum.photos/seed/cosmic/600/800', price: 4500, style: 'Abstract' },
];

const myArtworks = [
  { id: 1, title: 'Crimson Tide', status: 'For Sale', imageUrl: 'https://picsum.photos/seed/e/400/300' },
  { id: 2, title: 'Metropolis Glow', status: 'Sold', imageUrl: 'https://picsum.photos/seed/f/400/300' },
  { id: 3, title: 'New Horizon', status: 'For Sale', imageUrl: 'https://picsum.photos/seed/m/400/300' },
];

const exhibitions = [
  { id: 1, title: 'A Journey Through Light', status: 'Published' },
  { id: 2, title: 'Cultural Crossroads', status: 'Draft' },
];

// Simulate an API call with a delay
export const fetchArtworks = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(artworks);
    }, 500); // 0.5 second delay
  });
};

export const fetchMyArtworks = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(myArtworks);
    }, 500);
  });
};

export const fetchExhibitions = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(exhibitions);
    }, 500);
  });
};
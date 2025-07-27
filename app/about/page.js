import AboutClient from './AboutClient';


export const metadata = {
  title: 'About ArcadeTrack – calculate cloud Arcade points',
  description: 'ArcadeTrack helps Students to calculate Google Cloud Arcade points easily. No login, no clutter.',
  keywords: ['arcade points calculator', 'ArcadeTrack', 'arcade total points', 'Badge Tracker'],
  openGraph: {
    title: 'About ArcadeTrack',
    description: 'A clean, fast, no-login tool to calculate Google Cloud Arcade points.',
    url: 'https://www.arcadetrack.com/about',
    siteName: 'ArcadeTrack',
    images: [
      {
        url: 'https://www.arcadetrack.com/',
        width: 1200,
        height: 630,
        alt: 'ArcadeTrack Screenshot',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ArcadeTrack',
    description: 'Fast and accurate way to calculate Arcade points.',
    images: ['https://www.arcadetrack.com/'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

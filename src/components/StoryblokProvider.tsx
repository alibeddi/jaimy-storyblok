'use client';
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Page from './blocks/Page';
import Header from './blocks/Header';
import Hero from './blocks/Hero';
import Steps from './blocks/Steps';
import Features from './blocks/Features'; // Add this import

// Initialize Storyblok for client-side
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    header: Header,
    hero: Hero,
    steps: Steps,
    features: Features, // Add this component
  },
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return children;
}


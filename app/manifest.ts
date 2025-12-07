import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chad Cn',
    short_name: 'Chad Cn',
    description:
      'Collection of fully customizable, animated, free UI components built with React, TypeScript, Tailwind CSS, and Motion.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [],
  };
}

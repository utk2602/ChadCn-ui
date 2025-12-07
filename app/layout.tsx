import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

import './globals.css';
import { StyleProvider } from '@/providers/style-provider';
import { siteConfig } from '@/config/site';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Chad Cn',
    default:
      'Chad Cn - Copy/Past or Install React components compatible with Shadcn Registry',
  },
  description:
    'Collection of fully customizable, animated, free UI components built with React, TypeScript, Tailwind CSS, and Motion.',
  keywords: [
    'Chad Cn',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Motion',
    'Shadcn registry components',
    'Free UI components',
    'copy past components',
    'cli install components',
    'shadcn registry components',
    'Animated UI components',
    'UI distribution',
    'Open-source components',
    'animations',
  ],
  authors: [
    {
      name: 'Youcef Bnm',
      url: siteConfig.links.github,
    },
  ],
  publisher: 'Chad Cn',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Chad Cn',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Chad Cn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Chad Cn_ui',
    title: 'Chad Cn',
    description:
      'Collection of fully customizable, animated, free UI components built with React, TypeScript, Tailwind CSS, and Motion.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Chad Cn',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} antialiased flex flex-col min-h-dvh`}
      >
        <StyleProvider>
          <RootProvider>{children}</RootProvider>
        </StyleProvider>
        <Analytics />
      </body>
    </html>
  );
}

'use client';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { siteConfig } from '@/config/site';
import XIcon from './icons/x-icon';
import GithubIcon from './icons/github-icon';
import { Button } from './ui/button';

export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center space-x-4 font-medium text-sm">
      <Link
        href="/docs"
        className="p-2 text-sm transition-colors hover:text-accent-foreground"
      >
        Components
      </Link>

      <Link
        target="_blank"
        rel="noreferrer noopener"
        href={siteConfig.links.x}
        className="transition-colors hover:text-accent-foreground"
      >
        <XIcon className="size-4" />
      </Link>

      <ModeToggle />
    </div>
  );
}

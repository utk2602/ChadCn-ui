# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- 🎨 Complete redesign of the Veo template for improved aesthetics and user experience
- 🏠 Updated the home page: added a featured components showcase and contact information
- ⚡️ Optimized performance in `text-stagger-inview` (reduced layout thrashing and improved intersection handling)
- 🔄 Modified animation range in `scroll-reverse-scale-animation` component
- 🏷️ Renamed `use-animation-variants` to `animation-variants` for better semantic clarity
- 🏠 Redesign demo: `header` — updated header demo layout and accessibility improvements
- 🏡 Redesign home page — updates to hero and layout for improved visual hierarchy

### Added

- ✨ New components:
  - `text-scroll-read` — readable-on-scroll text reveal
  - `wavy-text` — animated wavy typography
  - `wavy-block` — a content block with wavy reveal/clip animations
- 🧩 New template: `motus-studio` — opinionated starter template showcasing the component registry and layouts

## [0.2.0] - 2025-11-20

### Added

- 🧩 New template: `carecover` — CareCover health startup template (Next.js + Tailwind) with animated pricing, responsive header navigation, and scroll autoplay components
- ✨ New component: `pricing` — Pricing component with monthly/yearly toggle and sliding animation
- ✨ New component: `toggle-layout-view` — Toggle layout view component for pricing and layouts
- ✨ New component: `responsive-header-nav` — Responsive Header Navigation component (mobile-first)
- ✨ New component: `scroll-autoplay` — Scroll autoplay animation component used in hero/demo sections

### Fixed

- ⚡️ Improved performance of text animation components
  - Optimized `text-stagger-inview` component
  - Enhanced `text-stagger-hover` component efficiency
- 🐛 Fix: slideshow images — improved preload/mount order to avoid flicker when slides become active
- 🐛 Fix: pricing demo responsiveness — adjusted breakpoints and toggle layout to prevent overflow and layout breaking

## [0.1.0] - 2025-09-23

### Added

- Initial release of Chad Cn
- Component registry system
- Documentation site with Fumadocs
- Three template projects: Veo, Alba Studio, and Motus Studio

[Unreleased]: https://github.com/YoucefBnm/chadcn-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/YoucefBnm/chadcn-ui/releases/tag/v0.1.0

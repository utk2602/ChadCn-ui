ChadCn UI
ChadCn UI is a powerful, flexible, and high-performance component library built using Next.js, Tailwind CSS, and ShadCN UI. Designed with a strong developer experience in mind, it provides production-ready UI components that are fast, customizable, and elegant by default.

Opinionated by design.
Aesthetic by nature.
Performance by priority.

Features
Built on ShadCN – leveraging a robust headless component system

Optimized for Next.js 14+ – fully compatible with the App Router and server components

Tailwind CSS + Radix UI – precise, accessible styling with built-in dark mode

Modular and Tree-shakable – only include what you use

Fully Customizable – easily theme or override styles to match your design system

Installation
bash
Copy
Edit
npm install chadcn-ui
# or
yarn add chadcn-ui
Usage Example
tsx
Copy
Edit
// app/page.tsx or any component
import { Button } from "chadcn-ui";

export default function Page() {
  return <Button variant="chad">Click me</Button>;
}
Available Components
Button

Card

Input

Modal

Tabs

Toast

Additional components coming soon

Need a new component? Open an issue or contribute directly via pull request.

Theming
ChadCn UI supports full theming and customization using Tailwind’s utility classes, @apply, and CSS variables. Whether you're building a cyberpunk-inspired interface or a minimalistic dashboard, you can tailor the look and feel to your needs.

Built With
Next.js

Tailwind CSS

Radix UI

ShadCN UI

Design Philosophy
Don’t ship generic. Ship bold.

ChadCn UI is designed to be more than just functional. It promotes clarity, consistency, and a modern frontend development experience that helps your product stand out.

Contributing
We welcome contributions of all kinds.
For major changes, please open an issue first to discuss what you would like to improve. Pull requests are reviewed regularly.

License
Licensed under the MIT License.

Acknowledgements
Special thanks to ShadCN and the open-source community for inspiring the foundation and best practices this project is built upon.

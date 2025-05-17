"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  ArrowRight,
  Zap,
  Shield,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LampDemo } from "@/CHADCN-UI/lamp-hero";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-gradient-to-b from-black to-gray-900 dark:from-black dark:to-gray-900">
      {/* Hero Section with LampDemo */}
      <section className="relative overflow-hidden pb-8">
        <LampDemo />
        <div className="container px-4 md:px-6 relative -mt-8 z-50 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto"
          >
            Bold, clean, and custom UI components for the modern web.
            <br className="hidden md:inline" /> Built with a Chad-like attitude.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold px-10 py-6 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
              <Link href="/docs">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-semibold rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-10 py-6"
            >
              <Link
                href="https://github.com/utk2602"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span>Star on GitHub</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black/80">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Unique Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Custom-built components with a monochrome design philosophy
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[ 
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Custom Components",
                description:
                  "Unique, hand-crafted components that aren't based on existing libraries.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Monochrome Design",
                description:
                  "Clean black and white aesthetics for a bold, minimalist look.",
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Easy Integration",
                description:
                  "Simple copy-paste code snippets with clear documentation.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-10 text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-lg bg-white/10 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-3xl p-16 flex flex-col items-center text-center relative overflow-hidden border border-gray-700"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 relative">
              Ready to build with ChadCn UI?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mb-10 relative">
              Start using our custom components to create beautiful, responsive
              interfaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 bg-white text-black hover:bg-gray-200 font-semibold"
              >
                <Link href="/docs">View Documentation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-10 py-6"
              >
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-16 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="text-center text-4xl md:text-5xl font-extrabold text-white mb-8">
              ChadCn - UI
            </div>
            <div className="flex gap-8 mb-8">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-3 rounded-full hover:bg-gray-800"
              >
                <Twitter className="h-7 w-7" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/utk2602"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black-400 hover:text-white transition-colors p-3 rounded-full hover:bg-gray-800"
              >
                <Github className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-700 pt-8">
            <p className="text-black-400 text-sm">
              © {new Date().getFullYear()} ChadCn UI. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="/docs"
                className="text-sm text-black-400 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/components"
                className="text-sm text-black hover:text-white transition-colors"
              >
                Components
              </Link>
              <Link
                href="/blog"
                className="text-sm text-black-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

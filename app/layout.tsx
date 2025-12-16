import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | StableVault',
    default: 'StableVault',
  },
  description: '',
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} ${interTight.variable} antialiased`}>
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

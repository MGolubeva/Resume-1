import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Mariia Golubieva | Lead Business Analyst',
  description: 'Architecting clarity within complexity. I combine precision with human-centric leadership to scale platforms and the people who build them.',
  openGraph: {
    title: 'Mariia Golubieva | Lead Business Analyst',
    description: 'Architecting clarity within complexity. I combine precision with human-centric leadership to scale platforms and the people who build them.',
    url: 'https://mariia-golubieva.com',
    siteName: 'Mariia Golubieva Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mariia Golubieva | Lead Business Analyst',
    description: 'Architecting clarity within complexity.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-bg text-text font-sans antialiased selection:bg-accent selection:text-bg" suppressHydrationWarning>
        <div className="bg-noise" />
        {children}
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {AuthProvider} from "@/components/auth/AuthContext";
import Navbar from "@/components/Navbar"; // Import Navbar

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Library Hub',
  description: 'Discover and explore a world of books and events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Navbar/> {/* Add Navbar here */}
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}


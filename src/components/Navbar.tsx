"use client";

import Link from 'next/link';
import { useAuth } from "@/components/auth/AuthContext";
import Logout from "@/components/auth/Logout";

function Navbar() {
  const {user} = useAuth();

  return (
    <nav className="bg-background py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-primary">
          Library Hub
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <Link href="/search" className="hover:text-secondary transition-colors">
            Search
          </Link>
          <Link href="/books" className="hover:text-secondary transition-colors">
            Books
          </Link>
          <Link href="/loans" className="hover:text-secondary transition-colors">
            Loans
          </Link>
          <Link href="/events" className="hover:text-secondary transition-colors">
            Events
          </Link>
          {user ? (
            <Logout />
          ) : (
            <>
              <Link href="/login" className="hover:text-secondary transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-secondary transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl?: string;
}

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(`/api/books?search=${searchQuery}`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    }

    fetchBooks();
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book Catalog</h1>

      <Input
        type="text"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <motion.div
            key={book.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={book.coverImageUrl || '/placeholder.jpg'}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

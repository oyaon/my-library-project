"use client";

import { useState, useEffect } from 'react';
import { getBooks, searchBooks } from '@/services/bookService';
import type { Book } from '@/types/Book';
import BookList from "@/components/books/BookList";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const fetchedBooks = searchTerm ? await searchBooks(searchTerm) : await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div
      className="container mx-auto py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-semibold mb-4">Book Catalog</h1>
      <Input
        type="text"
        placeholder="Search books by title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <BookList books={books} />
      )}
    </motion.div>
  );
};

export default CatalogPage;

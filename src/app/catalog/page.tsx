"use client";

import { useState, useEffect } from 'react';
import { getBooks } from '@/services/bookService';
import type { Book } from '@/types/Book';
import BookList from "@/components/books/BookList";

const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">Book Catalog</h1>
      {isLoading ? (
        <p>Loading books...</p>
      ) : (
          <BookList/>
      )}
    </div>
  );
};

export default CatalogPage;

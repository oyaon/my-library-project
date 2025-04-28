"use client";

import { useState, useEffect } from 'react';
import type { Book } from '@/types/Book';
import { getBooks, searchBooks } from '@/services/bookService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const ITEMS_PER_PAGE = 6;

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let fetchedBooks: Book[];
        if (searchTerm) {
          fetchedBooks = await searchBooks(searchTerm);
        } else {
          fetchedBooks = await getBooks();
        }
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedBooks = books.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search books by title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              width={200}
              height={300}
              className="object-cover rounded-md aspect-[2/3] hover:scale-105 transition-transform"
            />
            <CardContent className="p-4">
              <CardTitle className="text-sm font-semibold">{book.title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">{book.author}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default BookList;

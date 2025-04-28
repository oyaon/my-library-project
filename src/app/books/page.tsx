"use client";

import BookList from "@/components/books/BookList";
import BookManagement from "@/components/books/BookManagement";

const BooksPage = () => {
  return (
    <div>
      <h1>Books</h1>
      <BookManagement />
      <BookList />
    </div>
  );
};

export default BooksPage;
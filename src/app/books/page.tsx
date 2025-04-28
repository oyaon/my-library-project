"use client";

import BookList from "@/components/books/BookList";
import BookManagement from "@/components/books/BookManagement";
import {useAuth, UserRoles} from "@/components/auth/AuthContext";

const BooksPage = () => {
  const { user, role } = useAuth();

  if (role !== UserRoles.ADMIN && role !== UserRoles.LIBRARIAN) {
    return (
      <div>
        <h1>Books</h1>
        <BookList />
      </div>
    );
  }

  return (
    <div>
      <h1>Books</h1>
      <BookManagement />
      <BookList />
    </div>
  );
};

export default BooksPage;

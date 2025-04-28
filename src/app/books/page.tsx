"use client";

import BookList from "@/components/books/BookList";
import BookManagement from "@/components/books/BookManagement";
import {useAuth, UserRoles} from "@/components/auth/AuthContext";

const BooksPage = () => {
  const { role } = useAuth();

  // Only admins and librarians can manage books
  const canManageBooks = role === UserRoles.ADMIN || role === UserRoles.LIBRARIAN;

  return (
    <div>
      <h1>Books</h1>
      {canManageBooks && <BookManagement />}
      <BookList />
    </div>
  );
};

export default BooksPage;

"use client";

import { useState } from 'react';
import type { Book } from '@/types/Book';
import { createBook, updateBook, deleteBook } from '@/services/bookService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for book validation
const bookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  author: z.string().min(2, { message: "Author must be at least 2 characters." }),
  isbn: z.string().regex(/^\d{13}$/, { message: "Invalid ISBN" }),
  description: z.string().optional(),
  coverImageUrl: z.string().url({ message: "Invalid URL" }),
});

type BookSchemaType = z.infer<typeof bookSchema>;

const BookManagement = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookSchemaType>({
    resolver: zodResolver(bookSchema),
  });

  const handleCreateBook = async (data: BookSchemaType) => {
    try {
      const newBookId = await createBook(data);
      toast({
        title: "Book Created",
        description: `Book ${data.title} has been created`
      });
      reset();
    } catch (error) {
      console.error("Failed to create book", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create book`
      });
    }
  };

  const handleUpdateBook = async (data: BookSchemaType) => {
    if (!selectedBookId) {
      console.warn("No book selected for update.");
      toast({
        variant: "destructive",
        title: "Error",
        description: `No book selected for update.`
      });
      return;
    }
    try {
      await updateBook(selectedBookId, data);
      toast({
        title: "Book Updated",
        description: `Book ${data.title} has been updated`
      });
      reset();
      setSelectedBookId(null);
    } catch (error) {
      console.error("Failed to update book", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update book`
      });
    }
  };

  const handleDeleteBook = async () => {
    if (!selectedBookId) {
      console.warn("No book selected for deletion.");
      toast({
        variant: "destructive",
        title: "Error",
        description: `No book selected for deletion.`
      });
      return;
    }
    try {
      await deleteBook(selectedBookId);
      toast({
        title: "Book Deleted",
        description: `Book has been deleted`
      });
      reset();
      setSelectedBookId(null);
    } catch (error) {
      console.error("Failed to delete book", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete book`
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Book Management</h2>

      <form onSubmit={handleSubmit(selectedBookId ? handleUpdateBook : handleCreateBook)}>
        <Input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="mb-2"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Input
          type="text"
          placeholder="Author"
          {...register("author")}
          className="mb-2"
        />
        {errors.author && <p className="text-red-500">{errors.author.message}</p>}

        <Input
          type="text"
          placeholder="ISBN"
          {...register("isbn")}
          className="mb-2"
        />
        {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}

        <Textarea
          placeholder="Description"
          {...register("description")}
          className="mb-2"
        />

        <Input
          type="text"
          placeholder="Cover Image URL"
          {...register("coverImageUrl")}
          className="mb-4"
        />
        {errors.coverImageUrl && <p className="text-red-500">{errors.coverImageUrl.message}</p>}

        <div className="flex gap-2">
          <Button type="submit">{selectedBookId ? "Update Book" : "Create Book"}</Button>
          {selectedBookId && (
            <Button onClick={handleDeleteBook} variant="destructive">Delete Book</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookManagement;

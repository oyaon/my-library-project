"use client";

import { useState } from 'react';
import type { Book } from '@/types/Book';
import { createBook, updateBook, deleteBook } from '@/services/bookService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

const BookManagement = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null); // Track which book is being edited
    const { toast } = useToast();

  const handleCreateBook = async () => {
    try {
      const newBookId = await createBook({ title, author, isbn, description, coverImageUrl });
        toast({
            title: "Book Created",
            description: `Book ${title} has been created`
        })
      clearInputFields();
    } catch (error) {
      console.error("Failed to create book", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to create book`
        })
    }
  };

  const handleUpdateBook = async () => {
    if (!selectedBookId) {
      console.warn("No book selected for update.");
        toast({
            variant: "destructive",
            title: "Error",
            description: `No book selected for update.`
        })
      return;
    }
    try {
      await updateBook(selectedBookId, { title, author, isbn, description, coverImageUrl });
        toast({
            title: "Book Updated",
            description: `Book ${title} has been updated`
        })
      clearInputFields();
      setSelectedBookId(null); // Clear selected book after update
    } catch (error) {
      console.error("Failed to update book", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to update book`
        })
    }
  };

  const handleDeleteBook = async () => {
    if (!selectedBookId) {
      console.warn("No book selected for deletion.");
        toast({
            variant: "destructive",
            title: "Error",
            description: `No book selected for deletion.`
        })
      return;
    }
    try {
      await deleteBook(selectedBookId);
        toast({
            title: "Book Deleted",
            description: `Book has been deleted`
        })
      clearInputFields();
      setSelectedBookId(null); // Clear selected book after delete
    } catch (error) {
      console.error("Failed to delete book", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to delete book`
        })
    }
  };

  const clearInputFields = () => {
    setTitle('');
    setAuthor('');
    setIsbn('');
    setDescription('');
    setCoverImageUrl('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Book Management</h2>

      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Cover Image URL"
        value={coverImageUrl}
        onChange={(e) => setCoverImageUrl(e.target.value)}
        className="mb-4"
      />

      <div className="flex gap-2">
        <Button onClick={handleCreateBook}>Create Book</Button>
        <Button onClick={handleUpdateBook} disabled={!selectedBookId}>Update Book</Button>
        <Button onClick={handleDeleteBook} disabled={!selectedBookId}>Delete Book</Button>
      </div>
    </div>
  );
};

export default BookManagement;

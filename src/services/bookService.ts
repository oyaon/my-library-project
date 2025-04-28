'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import type { Book } from '@/types/Book';

const BOOKS_COLLECTION = 'books';

export async function createBook(book: Omit<Book, 'id'>): Promise<string> {
  try {
    const booksCollectionRef = collection(db, BOOKS_COLLECTION);
    const docRef = await addDoc(booksCollectionRef, book);
    return docRef.id;
  } catch (error: any) {
    console.error("Error creating book:", error.message);
    throw new Error(`Failed to create book: ${error.message}`);
  }
}

export async function updateBook(bookId: string, updates: Partial<Book>): Promise<void> {
  try {
    const bookDocRef = doc(db, BOOKS_COLLECTION, bookId);
    await updateDoc(bookDocRef, updates);
  } catch (error: any) {
    console.error("Error updating book:", error.message);
    throw new Error(`Failed to update book: ${error.message}`);
  }
}

export async function deleteBook(bookId: string): Promise<void> {
  try {
    const bookDocRef = doc(db, BOOKS_COLLECTION, bookId);
    await deleteDoc(bookDocRef);
  } catch (error: any) {
    console.error("Error deleting book:", error.message);
    throw new Error(`Failed to delete book: ${error.message}`);
  }
}

export async function getBooks(): Promise<Book[]> {
  try {
    const booksCollectionRef = collection(db, BOOKS_COLLECTION);
    const snapshot = await getDocs(booksCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  } catch (error: any) {
    console.error("Error getting books:", error.message);
    throw new Error(`Failed to get books: ${error.message}`);
  }
}

export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
  try {
    if (!searchTerm) {
      return getBooks(); // If no search term, return all books
    }

    const booksCollectionRef = collection(db, BOOKS_COLLECTION);
    // Create a query to search for books where the title contains the search term
    const q = query(booksCollectionRef, 
      where('title', '>=', searchTerm),
      where('title', '<=', searchTerm + '\uf8ff') //'\uf8ff' is the last code point in the Unicode Basic Multilingual Plane, used for range queries
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  } catch (error: any) {
    console.error("Error searching books:", error.message);
    throw new Error(`Failed to search books: ${error.message}`);
  }
};

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
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}

export async function updateBook(bookId: string, updates: Partial<Book>): Promise<void> {
  try {
    const bookDocRef = doc(db, BOOKS_COLLECTION, bookId);
    await updateDoc(bookDocRef, updates);
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}

export async function deleteBook(bookId: string): Promise<void> {
  try {
    const bookDocRef = doc(db, BOOKS_COLLECTION, bookId);
    await deleteDoc(bookDocRef);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

export async function getBooks(): Promise<Book[]> {
  try {
    const booksCollectionRef = collection(db, BOOKS_COLLECTION);
    const snapshot = await getDocs(booksCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

export async function searchBooks(searchTerm: string): Promise<Book[]> {
    try {
        if (!searchTerm) {
            return getBooks(); // Return all books if search term is empty
        }

        const booksCollectionRef = collection(db, BOOKS_COLLECTION);
        const q = query(
            booksCollectionRef,
            where('title', '>=', searchTerm),
            where('title', '<=', searchTerm + '\uf8ff')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
}

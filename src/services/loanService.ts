'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import type { Loan } from '@/types/Loan';

const LOANS_COLLECTION = 'loans';

// Function to create a new loan
export async function createLoan(loan: Omit<Loan, 'id' | 'loanDate'>): Promise<string> {
  try {
    const loansCollectionRef = collection(db, LOANS_COLLECTION);
    const docRef = await addDoc(loansCollectionRef, {
      ...loan,
      loanDate: new Date().toISOString(), // Store current date as loan date
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating loan:", error);
    throw error;
  }
}

// Function to update a loan (e.g., when returning a book)
export async function updateLoan(loanId: string, updates: Partial<Loan>): Promise<void> {
  try {
    const loanDocRef = doc(db, LOANS_COLLECTION, loanId);
    await updateDoc(loanDocRef, updates);
  } catch (error) {
    console.error("Error updating loan:", error);
    throw error;
  }
}

// Function to get all loans for a specific user
export async function getLoansForUser(userId: string): Promise<Loan[]> {
  try {
    const loansCollectionRef = collection(db, LOANS_COLLECTION);
    const q = query(loansCollectionRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Loan));
  } catch (error) {
    console.error("Error getting loans for user:", error);
    throw error;
  }
}

// Function to mark a book as returned
export async function returnBook(loanId: string): Promise<void> {
    try {
        const loanDocRef = doc(db, LOANS_COLLECTION, loanId);
        await updateDoc(loanDocRef, {
            returnDate: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error returning book:", error);
        throw error;
    }
}

'use server';

import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import type { Event } from '@/types/Event';

const EVENTS_COLLECTION = 'events';

export async function createEvent(event: Omit<Event, 'id'>): Promise<string> {
  try {
    const eventsCollectionRef = collection(db, EVENTS_COLLECTION);
    const docRef = await addDoc(eventsCollectionRef, event);
    return docRef.id;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export async function updateEvent(eventId: string, updates: Partial<Event>): Promise<void> {
  try {
    const eventDocRef = doc(db, EVENTS_COLLECTION, eventId);
    await updateDoc(eventDocRef, updates);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  try {
    const eventDocRef = doc(db, EVENTS_COLLECTION, eventId);
    await deleteDoc(eventDocRef);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCollectionRef = collection(db, EVENTS_COLLECTION);
    const snapshot = await getDocs(eventsCollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
}

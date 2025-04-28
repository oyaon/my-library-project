export type Event = {
  id?: string; // Optional id, Firestore will generate it
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
};

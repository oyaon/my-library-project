export type Book = {
  id?: string; // Optional id, Firestore will generate it
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverImageUrl: string;
};

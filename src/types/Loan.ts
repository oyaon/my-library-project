export type Loan = {
  id?: string; // Optional id, Firestore will generate it
  userId: string;
  bookId: string;
  loanDate: string; // Date string in ISO format
  dueDate: string;   // Date string in ISO format
  returnDate?: string | null; // Date string in ISO format, null if not returned
};

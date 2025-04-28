# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Security Rules (Firestore)

Remember to define appropriate security rules in your Firebase console to protect your data. You can find documentation on how to do this here: [https://firebase.google.com/docs/firestore/security/get-started](https://firebase.google.com/docs/firestore/security/get-started)

Example rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read: if true;  // Everyone can read books
      allow create, update, delete: if request.auth != null && getUserRole(request.auth.uid) == 'admin'; // Only admins can modify
    }

  }
}
```

## Firestore Index Optimization

To ensure efficient and fast data retrieval, it's crucial to optimize your Firestore indexes. Firestore automatically indexes single fields, but for complex queries that involve multiple fields or ordering, you'll need to create composite indexes.

Here's how to identify and create necessary indexes:

1.  **Identify Complex Queries**: Look at your `src/services` directory, particularly in files like `bookService.ts`, `eventService.ts`, and `loanService.ts`. Identify queries that use multiple `where()` clauses or involve sorting (`orderBy()`).

2.  **Check for Indexing Errors**: When you run a query that requires an index that doesn't exist, Firestore will usually provide an error message in your browser's console. This error message will include a link to the Firestore console where you can create the missing index.

3.  **Create Composite Indexes**:
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Select your project.
    *   Navigate to "Firestore Database".
    *   Click on the "Indexes" tab.
    *   Create the indexes as suggested by the error messages or based on your query patterns.

Example:

If you have a query that filters books by `author` and sorts them by `title`, you'll need a composite index on `author` (ascending) and `title` (ascending).

By carefully creating the necessary indexes, you can significantly improve the performance and scalability of your Firestore database.

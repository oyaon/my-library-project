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

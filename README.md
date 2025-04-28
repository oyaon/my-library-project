# Library Hub

A Next.js starter project with Firebase and Genkit integration, designed for managing library resources.

## Features

*   **User Authentication:** Implemented with Firebase Authentication.
*   **Book Catalog:** Displays books fetched from a mock API (`/api/books`). Includes smooth fade-in animations (Framer Motion) and a responsive, mobile-first design (Tailwind CSS).
*   **APIs:** Basic API for login (`/api/login`).
*   **UI Foundation:** Uses Shadcn UI components for a consistent look and feel.
*   **Technology Stack:** Next.js, Firebase, Genkit, Shadcn UI.
*   **Search:** Implemented book search.
*   **Basic Authentication:** Basic Authentication Using Middleware.

## Next Steps

*   Implement Firestore Security Rules.
*   Enhance form validation.
*   Standardize error responses in API services.
*   Resolve hydration errors.
*   Implement unit tests for services.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**

    *   Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable Authentication and Firestore Database.
    *   Obtain your Firebase configuration values.
    *   Set the following environment variables in a `.env.local` file (create one if it doesn't exist):

        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app directory (pages, layout)
│   ├── api/            # API routes
│   │   ├── books/        # Book-related API
│   │   └── login/        # Login API
│   ├── catalog/        # Catalog page
│   └── layout.tsx      # Shared layout
├── components/         # React components
│   ├── auth/           # Authentication components
│   ├── books/          # Book components
│   ├── events/         # Event components
│   ├── loans/          # Loan components
│   └── ui/             # Shadcn UI components
├── services/           # Data fetching and business logic
│   └── bookService.ts
├── lib/                # Utility functions and Firebase config
│   └── firebase.ts
└── types/              # TypeScript type definitions
    └── Book.ts
```

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

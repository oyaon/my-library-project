"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@/components/auth/AuthContext";
import { recommendBooks, RecommendBooksOutput } from '@/ai/flows/book-recommendation-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import type { Book } from '@/types/Book';
import { getBooks } from '@/services/bookService';

const BookRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<RecommendBooksOutput | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        return;
      }

      try {
        const input = {
          genrePreferences: ['Fiction', 'Thriller'], // Example preferences
          authorPreferences: ['Jane Austen', 'Haruki Murakami'], // Example preferences
          recentBorrowedBooks: [], // Example - can be populated from user's loan history
          userId: user.uid,
        };

        const recommendationsData = await recommendBooks(input);
        setRecommendations(recommendationsData);

        if (recommendationsData && recommendationsData.recommendedBookIds) {
          // Fetch book details for the recommended book IDs
          const allBooks = await getBooks();
          const filteredBooks = allBooks.filter(book =>
            recommendationsData.recommendedBookIds.includes(book.id || '')
          );
          setRecommendedBooks(filteredBooks);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch book recommendations');
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) {
    return <div>Loading book recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recommendations || !recommendations.recommendedBookIds.length) {
    return <div>No book recommendations found.</div>;
  }

  return (
    <div>
      <h2>Book Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              width={200}
              height={300}
              className="object-cover rounded-md aspect-[2/3] hover:scale-105 transition-transform"
            />
            <CardContent className="p-4">
              <CardTitle className="text-sm font-semibold">{book.title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">{book.author}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;

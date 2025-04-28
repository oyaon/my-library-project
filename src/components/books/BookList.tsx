"use client";

import type { Book } from '@/types/Book';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface BookListProps {
  books: Book[];
  isLoading?: boolean;
}

const BookList = ({ books, isLoading }: BookListProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {isLoading ? ( // Show skeleton loader while loading
        Array.from({ length: 6 }).map((_, index) => (
          <Card key={`skeleton-${index}`} className="overflow-hidden">
            <Skeleton className="h-[300px] w-full object-cover rounded-md aspect-[2/3]" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))
      ) : (
        books.map((book) => (
          <motion.div
            key={book.id}
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        ))
      )}
    </div>
  );
};

export default BookList;

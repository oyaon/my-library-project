"use client";

import { useState, useEffect } from 'react';
import type { Loan } from '@/types/Loan';
import { getLoansForUser, returnBook } from '@/services/loanService';
import { useAuth } from "@/components/auth/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const LoanList = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true); // Set loading to true when fetching starts
      if (user) {
        try {
          const fetchedLoans = await getLoansForUser(user.uid);
          setLoans(fetchedLoans);
        } catch (error) {
          console.error("Failed to fetch loans", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch loans."
          });
        } finally {
          setIsLoading(false); // Set loading to false when fetching completes
        }
      } else {
        setIsLoading(false); // Ensure loading is set to false even if there's no user
      }
    };

    fetchLoans();
  }, [user, toast]);

  const handleReturnBook = async (loanId: string) => {
    try {
      await returnBook(loanId);
      setLoans(loans.map(loan =>
        loan.id === loanId ? { ...loan, returnDate: new Date().toISOString() } : loan
      ));
      toast({
        title: "Book Returned",
        description: "Book has been marked as returned."
      });
    } catch (error) {
      console.error("Failed to return book", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to return book."
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Borrowed Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? ( // Show skeleton loader while loading
          Array.from({ length: 6 }).map((_, index) => ( // Adjust the length based on your grid layout
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-1/4 mt-4" />
              </CardContent>
            </Card>
          ))
        ) : (
          loans.map((loan) => (
            <Card key={loan.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>Book ID: {loan.bookId}</CardTitle>
                <CardDescription>
                  Loan Date: {new Date(loan.loanDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
                {loan.returnDate ? (
                  <p>Returned On: {new Date(loan.returnDate).toLocaleDateString()}</p>
                ) : (
                  <Button onClick={() => handleReturnBook(loan.id)}>Return Book</Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LoanList;

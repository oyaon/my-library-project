"use client";

import { useState, useEffect } from 'react';
import type { Loan } from '@/types/Loan';
import { getLoansForUser, returnBook } from '@/services/loanService';
import { useAuth } from "@/components/auth/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const LoanList = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();
    const { toast } = useToast();

  useEffect(() => {
    const fetchLoans = async () => {
      if (user) {
        try {
          const fetchedLoans = await getLoansForUser(user.uid);
          setLoans(fetchedLoans);
        } catch (error) {
          console.error("Failed to fetch loans", error);
        }
      }
    };

    fetchLoans();
  }, [user]);

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
        {loans.map((loan) => (
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
        ))}
      </div>
    </div>
  );
};

export default LoanList;

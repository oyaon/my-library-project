"use client";

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const Logout = () => {
  const {toast} = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully!",
        description: "See you again soon!",
      });
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: `Something went wrong. Error: ${error.message}`,
      });
    }
  };

  return (
    <Button onClick={handleLogout} className="bg-secondary text-secondary-foreground">
      Log Out
    </Button>
  );
};

export default Logout;

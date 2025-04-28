"use client";

import React, { useState } from 'react';
import { auth } from '@/lib/firebase'; // Import the auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {toast} = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in successfully!",
        description: `Welcome back!`,
      })
    } catch (err) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: `Something went wrong. Error: ${err.message}`,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4"
      />
      <Button type="submit" className="w-full bg-primary text-primary-foreground">Log In</Button>
    </form>
  );
};

export default Login;
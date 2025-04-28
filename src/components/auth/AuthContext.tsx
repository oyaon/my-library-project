'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Define user roles
export const UserRoles = {
  ADMIN: 'admin',
  LIBRARIAN: 'librarian',
  MEMBER: 'member',
};

// Define the authentication context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  role: string | null;
};

// Create the authentication context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
});

// Create a custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

// Create the authentication provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Mock role fetching from database
        if (user.email?.endsWith("@admin.com")) {
          setRole(UserRoles.ADMIN);
        } else if (user.email?.endsWith("@librarian.com")) {
          setRole(UserRoles.LIBRARIAN);
        } else {
          setRole(UserRoles.MEMBER);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

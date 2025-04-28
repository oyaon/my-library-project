import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Set a cookie upon successful login
    cookies().set('loggedIn', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only set secure in production
      sameSite: 'strict', // Protect against CSRF
      maxAge: 60 * 60 * 24, // 1 day
      path: '/', // Ensure the cookie is valid for the entire site
    });

    return NextResponse.json({ message: 'Login successful' });
  } catch (error: any) {
    console.error("Login failed:", error);

    let errorMessage = 'Login failed';
    let statusCode = 401;

    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    } else {
      errorMessage = error.message; // General error message
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

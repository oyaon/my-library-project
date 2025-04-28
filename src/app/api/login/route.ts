import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Set a cookie upon successful login
     cookies().set('loggedIn', 'true', { httpOnly: true, maxAge: 60 * 60 * 24 });
    return NextResponse.json({ message: 'Login successful' });
  } catch (error: any) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}


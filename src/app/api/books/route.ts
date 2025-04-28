import { NextResponse } from 'next/server';

const books = [
  { id: '1', title: 'The Secret Garden', author: 'Frances Hodgson Burnett', coverImageUrl: 'https://picsum.photos/200/300' },
  { id: '2', title: 'Pride and Prejudice', author: 'Jane Austen', coverImageUrl: 'https://picsum.photos/200/301' },
  { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', coverImageUrl: 'https://picsum.photos/200/302' },
  { id: '4', title: '1984', author: 'George Orwell', coverImageUrl: 'https://picsum.photos/200/303' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search') || '';

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredBooks);
}

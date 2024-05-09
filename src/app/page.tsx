"use client";
import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

interface Book {
  id: number;
  title: string;
  publisher: string;
  edition: string;
  year: string;
  author: string;
  coverImage: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (newBook: Book) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold underline mb-4">Book Factory</h1>
      <BookForm addBook={addBook} />
      <BookList books={books} />
    </div>
  );
}

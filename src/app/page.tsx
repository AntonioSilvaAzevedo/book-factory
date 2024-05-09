"use client";
import Link from "next/link";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  publisher: string;
  edition: string;
  year: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Book One",
      publisher: "Publisher A",
      edition: "1st",
      year: "2020",
    },
    {
      id: 2,
      title: "Book Two",
      publisher: "Publisher B",
      edition: "2nd",
      year: "2021",
    },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold underline mb-4">
        Página Inicial - Catálogo de Livros
      </h1>
      <div className="space-x-4 mb-4">
        <Link href="/books/new">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cadastrar Livro
          </p>
        </Link>
        <Link href="/books">
          <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Listar Livros
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 shadow rounded">
            <h5 className="text-xl font-bold">{book.title}</h5>
            <p>Editora: {book.publisher}</p>
            <p>Edição: {book.edition}</p>
            <p>Ano: {book.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";

interface Book {
  id: string;
  title: string;
  publisher: string;
  edition: string;
  year: string;
  author: string;
  coverImage: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const addBook = (book: Book) => {
    if (currentBook) {
      const updatedBooks = books.map((b) =>
        b.id === book.id ? { ...b, ...book } : b
      );
      setBooks(updatedBooks);
      toast.success("Livro atualizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      const newBook = { ...book, id: uuidv4() };
      setBooks([...books, newBook]);
      toast.success("Livro adicionado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setCurrentBook(null);
  };

  const editBook = (bookId: string) => {
    const bookToEdit = books.find((book) => book.id === bookId);
    setCurrentBook(bookToEdit || null);
  };

  const deleteBook = (bookId: string) => {
    const filteredBooks = books.filter((book) => book.id !== bookId);
    setBooks(filteredBooks);
  };

  const welcomeMessage = () => {
    const bookCount = books.length;
    if (bookCount === 1) {
      return `Você possui: ${bookCount} livro cadastrado.`;
    } else if (bookCount > 1) {
      return `Você possui: ${bookCount} livros cadastrados.`;
    } else {
      return "Bem-vindo(a) ao Book Factory";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="border border-gray-200 rounded-md px-10 py-10 items-center justify-center flex flex-col bg-white">
        <h1 className="text-3xl font-bold mb-10 w-full text-center">
          {welcomeMessage()}
        </h1>
        <BookForm addBook={addBook} currentBook={currentBook} />
      </div>
      <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
    </div>
  );
}

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface BookFormProps {
  addBook: (book: Book) => void;
  currentBook: Book | null;
}

interface Book {
  id: string;
  author: string;
  title: string;
  publisher: string;
  edition: string;
  year: string;
  coverImage: string;
}

export default function BookForm({ addBook, currentBook }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [year, setYear] = useState("");
  const [bookId, setBookId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setPublisher(currentBook.publisher);
      setEdition(currentBook.edition);
      setAuthor(currentBook.author);
      setYear(currentBook.year);
      setCoverImage(currentBook.coverImage);
      setBookId(currentBook.id);
      setOpen(true);
    } else {
      setBookId(null);
    }
  }, [currentBook]);

  const resetFields = () => {
    setTitle("");
    setPublisher("");
    setEdition("");
    setAuthor("");
    setYear("");
    setCoverImage("");
    setBookId(null);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = bookId || uuidv4();
    addBook({
      id,
      title,
      author,
      publisher,
      edition,
      year,
      coverImage,
    });
    resetFields();
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-primary bg-green-500 px-4 rounded-md py-2 text-white mr-4 outline-none hover:bg-green-700">
          Cadastrar Livro
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
            <Dialog.Title className="text-lg font-bold text-center">
              {currentBook ? "Atualizar Livro" : "Cadastrar Livro"}
            </Dialog.Title>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border px-4 py-4 rounded-md bg-gray-100"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
              />
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Autor"
                className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
              />

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Editora"
                className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
              />

              <input
                type="text"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                placeholder="Edição"
                className="input input-bordered w-full  rounded-md px-4 py-1 outline-none"
              />

              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Ano de Publicação"
                className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
              />

              <input
                type="file"
                id="file"
                name="file"
                onChange={handleImageChange}
                className="input input-bordered w-full rounded-sm text-gray-500"
              />
              <button
                type="submit"
                className="btn btn-primary bg-green-500 px-4 rounded-md py-2 text-white mr-4  hover:bg-green-700"
              >
                {currentBook ? "Atualizar Livro" : "Cadastrar Livro"}
              </button>
              <Dialog.Close asChild>
                <button className="btn btn-secondary bg-red-500 px-4 rounded-md py-2 text-white hover:bg-red-700">
                  Cancelar
                </button>
              </Dialog.Close>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

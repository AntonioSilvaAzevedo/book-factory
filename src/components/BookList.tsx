interface Book {
  id: string;
  title: string;
  publisher: string;
  author: string;
  edition: string;
  year: string;
  coverImage: string;
}

interface Props {
  books: Book[];
  onEdit: (bookId: string) => void;
  onDelete: (bookId: string) => void;
}
export default function BookList({ books, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden w-full"
        >
          <img
            src={book.coverImage || "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full h-32 sm:h-48 object-cover"
          />
          <div className="p-4 ">
            <div className="border border-gray-200 px-2 rounded-md ">
              <h5 className="text-lg font-bold text-center">{book.title}</h5>
              <p className="text-sm">Autor: {book.author}</p>
              <p className="text-sm">Editora: {book.publisher}</p>
              <p className="text-sm">Edição: {book.edition}</p>
              <p className="text-sm">Ano: {book.year}</p>
            </div>
            <div className="flex justify-between items-center mt-4 gap-1">
              <button
                onClick={() => onEdit(book.id)}
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

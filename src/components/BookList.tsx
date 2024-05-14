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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden w-full transform transition duration-500 hover:scale-105 hover:shadow-xl"
        >
          <img
            src={book.coverImage || "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full h-40 sm:h-48 object-cover"
          />
          <div className="p-4">
            <div className="border border-gray-300 px-4 py-3 rounded-lg shadow-inner bg-gray-50">
              <h5 className="text-xl font-bold text-center text-gray-800">
                {book.title}
              </h5>
              <p className="text-md text-gray-600 mt-2">
                Autor: <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-md text-gray-600 mt-1">
                Editora: <span className="font-medium">{book.publisher}</span>
              </p>
              <p className="text-md text-gray-600 mt-1">
                Edição: <span className="font-medium">{book.edition}</span>
              </p>
              <p className="text-md text-gray-600 mt-1">
                Ano: <span className="font-medium">{book.year}</span>
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 gap-2">
              <button
                onClick={() => onEdit(book.id)}
                className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded transition duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded transition duration-300"
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

interface Book {
  id: number;
  title: string;
  publisher: string;
  author: string;
  edition: string;
  year: string;
  coverImage: string;
}

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={book.coverImage || "https://via.placeholder.com/150"}
            alt="Book Cover"
            className="w-full h-32 sm:h-48 object-cover"
          />
          <div className="p-4">
            <h5 className="text-lg font-bold">{book.title}</h5>
            <p className="text-sm">Autor: {book.author}</p>
            <p className="text-sm">Editora: {book.publisher}</p>
            <p className="text-sm">Edição: {book.edition}</p>
            <p className="text-sm">Ano: {book.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

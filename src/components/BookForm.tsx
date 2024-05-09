// components/BookForm.tsx
import { FormEvent, useState } from "react";

interface BookFormProps {
  onSubmit: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, publisher, edition, year });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        placeholder="Publisher"
      />
      <input
        value={edition}
        onChange={(e) => setEdition(e.target.value)}
        placeholder="Edition"
      />
      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year of Publication"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;

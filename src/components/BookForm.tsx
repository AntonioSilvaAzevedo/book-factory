import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

interface FormData {
  title: string;
  author: string;
  publisher: string;
  edition: string;
  year: string;
  coverImage: FileList;
}

export default function BookForm({ addBook, currentBook }: BookFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [open, setOpen] = useState(false);

  const coverImageFile = watch("coverImage");

  useEffect(() => {
    if (currentBook) {
      setValue("title", currentBook.title);
      setValue("publisher", currentBook.publisher);
      setValue("edition", currentBook.edition);
      setValue("author", currentBook.author);
      setValue("year", currentBook.year);
      // O campo coverImage será atualizado via handleImageChange
      setOpen(true);
    } else {
      reset();
    }
  }, [currentBook, setValue, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const id = currentBook?.id || uuidv4();
    const coverImage = coverImageFile?.[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const coverImageUrl = reader.result as string;
      addBook({
        id,
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        edition: data.edition,
        year: data.year,
        coverImage: coverImageUrl,
      });
      reset();
      setOpen(false);
    };

    if (coverImage) {
      reader.readAsDataURL(coverImage);
    } else {
      addBook({
        id,
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        edition: data.edition,
        year: data.year,
        coverImage: "",
      });
      reset();
      setOpen(false);
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
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 border px-4 py-4 rounded-md bg-gray-100"
            >
              <div>
                <input
                  type="text"
                  placeholder="Título"
                  {...register("title", { required: "Título é obrigatório" })}
                  className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Autor"
                  {...register("author", { required: "Autor é obrigatório" })}
                  className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
                />
                {errors.author && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.author.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Editora"
                  {...register("publisher", {
                    required: "Editora é obrigatória",
                  })}
                  className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
                />
                {errors.publisher && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.publisher.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Edição"
                  {...register("edition", { required: "Edição é obrigatória" })}
                  className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
                />
                {errors.edition && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.edition.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Ano de Publicação"
                  {...register("year", {
                    required: "Ano de Publicação é obrigatório",
                    pattern: { value: /^[0-9]{4}$/, message: "Ano inválido" },
                    maxLength: { value: 4, message: "Ano deve ter 4 dígitos" },
                  })}
                  className="input input-bordered w-full rounded-md px-4 py-1 outline-none"
                  onInput={(e) => {
                    if (e.currentTarget.value.length > 4) {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 4);
                    }
                  }}
                />
                {errors.year && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.year.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="file"
                  {...register("coverImage", {
                    required: "Imagem de capa é obrigatória",
                  })}
                  className="input input-bordered w-full rounded-sm text-gray-500"
                />
                {errors.coverImage && (
                  <span className="text-red-500 text-sm px-1">
                    {errors.coverImage.message}
                  </span>
                )}
              </div>
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

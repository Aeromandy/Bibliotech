import { Book } from "./book";

export interface Emprestimo {
    id?: string;
    leitor: string;
    email: string;
    telefone: string;
    status: string;
    livro: Book;
    data: string;
}
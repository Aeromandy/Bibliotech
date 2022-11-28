export interface Book {
    id?: string;
    titulo: string;
    autor: string;
    dataEmprestimo: Date;
    categoria: string;
    isbn: string;
    status: string;
    fotoUrl?: string;
    

}
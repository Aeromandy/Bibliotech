import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource: Book[] = [];

  public formBook: FormGroup;
  public book!: Book;
  public books: Book[] = []

  public loading: boolean = false;
  private fotoUrl: string = "";

  public isDisabledBook: boolean = true;

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bookService: BookService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.formBook = fb.group({
      titulo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initializeFields();
  }
  
  public initializeFields(): void {
    this.bookService.findAll().subscribe(books => {
      this.dataSource = books;
    })
  }

  public createBook(): void {
    if (this.formBook.valid) {
      const book: Book = this.formBook.value;
      book.fotoUrl = this.fotoUrl;
      this.bookService.createBook(book).subscribe(response => {
        this.notification.showMessage("Livro cadastrado.");
        this.initializeFields();
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.loading = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult => {
      this.loading = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.fotoUrl = fotoUrl;
      })
    });
  }

  public deleteBook(id: string, fotoUrl: string): void {
    if(fotoUrl != ''){
      this.uploadService.deleteFoto(fotoUrl);
    }
    this.bookService.deleteBook(id).subscribe(response => {
      this.notification.showMessage("Livro deletado com sucesso.");
      this.initializeFields();
    })
  }

  
}

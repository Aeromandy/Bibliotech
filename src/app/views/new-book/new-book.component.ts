import { Router } from '@angular/router';
import { BookService } from './../../services/book.service';
import { Book } from './../../models/book';
import { NotificationService } from './../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  public formBook: FormGroup;

  public loading: boolean = false;
  private fotoUrl: string = "";

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bookService: BookService,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.formBook = fb.group({
      titulo: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      dataEmprestimo: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
      isbn: ["", [Validators.required]],
      status: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public createBook(): void {
    if(this.formBook.valid) {
      const book: Book = this.formBook.value;
      book.fotoUrl = this.fotoUrl;
      this.bookService.createBook(book).subscribe(response => {
        this.notification.showMessage("Cadastrado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.loading = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe((uploadResult: { ref: any; })  => {
      this.loading = false;
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.fotoUrl = fotoUrl;
      })
    });
  }
}
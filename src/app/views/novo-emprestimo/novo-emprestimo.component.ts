import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { NotificationService } from '../../services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup;
  public book!: Book;
  public books: Book[] = [];

  public loading: boolean = false;
  private fotoUrl: string = "";

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bookService: BookService,
    private router: Router,
    private uploadService: UploadService,
    private emprestimoService: EmprestimoService
  ) {
    this.formEmprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      livro: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.listBooks();
  }

  public novoEmprestimo(): void{
    if(this.formEmprestimo.valid){
      const emprestimo : Emprestimo = this.formEmprestimo.value;
      emprestimo.data = new Date().toLocaleDateString();
      this.emprestimoService.novoEmprestimo(emprestimo).subscribe(response => {
        this.notification.showMessage("Emprestimo cadastrado!");
        this.router.navigate(['/painel']);
      })
    } else {
      this.notification.showMessage("Dados inválidos")
    }
    
  }

  public listBooks(): void {
    this.bookService.findAll().subscribe(book => {
      this.books = book;
    })
  }
}
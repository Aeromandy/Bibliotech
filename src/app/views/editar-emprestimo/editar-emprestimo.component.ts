import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public emprestimo: Emprestimo = {
    leitor: '',
    email: '',
    telefone: '',
    status: '',
    livro: {
      titulo: '',
      autor: '',
      categoria: '',
      isbn: ''
    },
    data: ''
  }

  public books: Book[] = [];

  constructor(
    fb: FormBuilder,
    private notification: NotificationService,
    private bookService: BookService,
    private router: Router,
    private emprestimoService: EmprestimoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listBooks();
    this.initializaFields();
  }

  public initializaFields(): void {
    const id = this.route.snapshot.params["id"];
    this.emprestimoService.listarPorId(id).subscribe(emprestimo  => {
      this.emprestimo = emprestimo;
    })
  }

  public editarEmprestimo(form: NgForm): void {
    if (form.valid) {
      this.emprestimoService.atualizarEmprestimo(this.emprestimo).subscribe(response => {
        this.notification.showMessage("Emprestimo cadastrado!");
        this.router.navigate(['/painel/new']);
      })
    }
  }

  public listBooks(): void {
    this.bookService.findAll().subscribe(book => {
      this.books = book;
    })
  }
}
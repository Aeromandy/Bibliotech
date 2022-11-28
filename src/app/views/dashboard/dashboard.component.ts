import { NotificationService } from './../../services/notification.service';
import { BookService } from './../../services/book.service';
import { Book } from './../../models/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['livro', 'leitor', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Book[] = [];

  constructor(
    private bookService: BookService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.bookService.findAll().subscribe(book => {
      this.dataSource = book;
    });
  }

  public deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
    });
  }
}
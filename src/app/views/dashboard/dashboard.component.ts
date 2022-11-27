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
  dataSource: Book[] = [
    {
      titulo: "o monge e o executivo",
      autor: "jose abreu",
      isbn: "65883685500",
      categoria: "auto-ajuda",
      fotoUrl: "https://editoraleader.com.br/media/catalog/product/cache/1/image/600x900/9df78eab33525d08d6e5fb8d27136e95/m/u/mulheres_tecnologia_vol1_rgb.jpg",
      status: "devolvido"

    }
  ];

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

  public deleteCollab(id: string): void {
    this.bookService.deleteBook(id).subscribe(response => {
      this.notification.showMessage("Apagado.");
    });
  }
}
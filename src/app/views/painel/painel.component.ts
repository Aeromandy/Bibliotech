import { Component, OnInit } from '@angular/core';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { BookDetailsComponent } from 'src/app/components/book-details/book-details.component';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  displayedColumns = ['leitor', 'livro', 'data', 'status', 'excluir', 'editar', 'capa'];
  dataSource: Emprestimo[] = [];
  public img: string = "assets/images/avatar.png"

  constructor(
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private uploadService: UploadService

  ) { }

  ngOnInit(): void {
    this.initialize();
  } 

  public initialize(): void {
    this.emprestimoService.listarEmprestimos().subscribe(emprestimos =>{
      this.dataSource = emprestimos;
    })
  }

  public deletarEmprestimo(id: string, fotoUrl: string): void {
    /* if(fotoUrl != '' || fotoUrl != undefined){
      this.uploadService.deleteFoto(fotoUrl);
    } */
    this.emprestimoService.deletarEmprestimo(id).subscribe(response => {
      this.notification.showMessage("Emprestimo apagado!");
      this.initialize();
    });
  }

  public openDetails(book: Book): void {
    this.dialog.open(BookDetailsComponent, {
      width: "400px",
      data: book
    });
  }
}

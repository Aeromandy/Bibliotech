import { Component, OnInit } from '@angular/core';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

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
    private dialogo: MatDialog,
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

  public deleteEmprestimo(id: string, link: string): void {
    this.emprestimoService.deletarEmprestimo(id).subscribe(response => {
      this.uploadService.deleteFoto(link);
      this.notification.showMessage("Apagado!");
      this.initialize();
    });
  }

  

}

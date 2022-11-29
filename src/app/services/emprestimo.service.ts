import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY, map, catchError } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService) 
    {}

    public listarEmprestimos(): Observable<any> {
      const promise = this.firestore.collection('emprestimos').get();
  
      return from(promise).pipe(
        map((response: any) => {
          return response.docs.map((doc: any) => {
            const emprestimo: Emprestimo = doc.data() as Emprestimo;
            emprestimo.id = doc.id;
            return emprestimo;
          })
        }),
        catchError(error => {
          this.notification.showMessage('Erro ao listar os empretimos');
          console.error(error);
          return EMPTY;
        })
      )
  
    }
  
    public novoEmprestimo(emprestimo: Emprestimo): Observable<any> {
      const promise = this.firestore.collection('emprestimos').add(emprestimo);
  
  
      return from(promise).pipe(
        catchError(error => {
          this.notification.showMessage('Erro ao criar um novo emprestimo');
          console.error(error);
          return EMPTY;
        })
      );
    }
  
    public listarPorId(idEmprestimo: string): Observable<any> {
      const promise = this.firestore.collection('emprestimos').doc(idEmprestimo).get();
  
      return from(promise).pipe(
        map(doc => {
          const emprestimo: Emprestimo = doc.data() as Emprestimo;
          emprestimo.id = doc.id;
          return emprestimo;
        }),
        catchError(error => {
          this.notification.showMessage('Erro ao buscar id!');
          console.error(error);
          return EMPTY;
        })
  
      )
    }
  
    public deletarEmprestimo(idEmpretimo: string): Observable<any> {
      const promise = this.firestore.collection('emprestimos').doc(idEmpretimo).delete();
  
      return from(promise).pipe(
        catchError(error => {
          this.notification.showMessage('Erro ao deletar o emprestimo!');
          console.error(error);
          return EMPTY;
        })
      );
    }
  
    public atualizarEmprestimo(emprestimo: Emprestimo): Observable<any> {
      const promise = this.firestore.collection('emprestimos').doc(emprestimo.id).update(emprestimo);
  
      return from(promise).pipe(
        catchError(error => {
          this.notification.showMessage('Erro ao atualizar o emprestimo!');
          console.error(error);
          return EMPTY;
        })
      );
    }
}

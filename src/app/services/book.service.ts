import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { Book } from '../models/book';
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
    ) { }

  public createBook(book: Book): Observable<any> {
    const promise = this.firestore.collection("bibliotech").add(book);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar livro");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public findAll(): Observable<any> {
    const promise = this.firestore.collection("bibliotech").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const book: Book = doc.data() as Book;
          book.id = doc.id;
          return book;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public findById(id: string): Observable<any> {
    const promise = this.firestore.collection("collaborators").doc(id).get();
    return from(promise).pipe(
      map(doc => {
        const book: Book = doc.data() as Book;
        book.id = doc.id;
        return book;
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar pelo id");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteBook(id: string) {
    const promise = this.firestore.collection("book").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  public updateBook(book: Book) {
    const promise = this.firestore.collection("bibliotech").doc(book.id).update(book);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao atualizar.");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
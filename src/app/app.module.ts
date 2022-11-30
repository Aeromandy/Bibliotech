import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { LivrosComponent } from './views/livros/livros.component';
import { PainelComponent } from './views/painel/painel.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    CadastrarUsuarioComponent,
    EditarEmprestimoComponent,
    NovoEmprestimoComponent,
    LivrosComponent,
    PainelComponent,
    BookDetailsComponent,
    AvatarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

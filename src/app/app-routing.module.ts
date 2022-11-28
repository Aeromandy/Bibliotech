import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NewBookComponent } from './views/new-book/new-book.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[ AuthGuard ],
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'dashboard',
    component: NewBookComponent,
    canActivate: [ AuthGuard ],
    title: "Novo Book | Bibliotech"
  },
  {
    path: 'dashboard/new',
    component: NewBookComponent,
    canActivate: [ AuthGuard ],
    title: "Novo Book | Bibliotech"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

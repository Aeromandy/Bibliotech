import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NovoEmprestimoComponent } from './views/novo-emprestimo/novo-emprestimo.component';
import { LivrosComponent } from './views/livros/livros.component';
import { PainelComponent } from './views/painel/painel.component';

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
    path: 'livros',
    component: LivrosComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'painel',
    component: PainelComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Bibliotech"
  },
  {
    path: 'painel/editar/:id',
    component: EditarEmprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Editar Emprestimo | Bibliotech"
  },
  {
    path: 'painel/new',
    component: NovoEmprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Novo Emprestimo | Bibliotech"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

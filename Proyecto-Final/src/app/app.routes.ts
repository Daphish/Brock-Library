import { Routes } from '@angular/router';
import { MainLayoutComponent } from './books/main-layout/main-layout.component';
import { InicioComponent } from './books/inicio/inicio.component';
import { DetallesComponent } from './books/detalles/detalles.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './books/admin/admin.component';

export const routes: Routes = [
    {path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'detalles/:id', component: DetallesComponent },
        { path: 'admin', component: AdminComponent}
    ]},
    {path: 'auth', children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent}
    ]},
    {path: '**', redirectTo: 'inicio'},
];
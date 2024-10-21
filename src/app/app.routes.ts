import { Routes } from '@angular/router';
import { MainLayoutComponent } from './books/main-layout/main-layout.component';
import { InicioComponent } from './books/inicio/inicio.component';
import { DetallesComponent } from './books/detalles/detalles.component';

export const routes: Routes = [
    {path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        {path: 'inicio', component: InicioComponent },
        { path: 'detalles', component: DetallesComponent}
    ]}
];

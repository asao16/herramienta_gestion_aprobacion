import { Routes } from '@angular/router';
import {ListaVerificadaComponent} from './features/listas/lista-vereficada/lista-verificada.component';

export const routes: Routes = [
  {path:'',component:ListaVerificadaComponent},
  {path:'lista_verificada',component:ListaVerificadaComponent, data:{filtro:'verificada'}},
  {path:'lista_no_verificada',component:ListaVerificadaComponent, data:{filtro:'no_verificada'}},
  {path:'**',redirectTo:''},
];

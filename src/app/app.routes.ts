import { Routes } from '@angular/router';
import {ListaVereficadaComponent} from './features/listas/lista-vereficada/lista-vereficada.component';

export const routes: Routes = [
  {path:'',component:ListaVereficadaComponent},
  {path:'lista_verificada',component:ListaVereficadaComponent, data:{filtro:'verificada'}},
  {path:'lista_no_verificada',component:ListaVereficadaComponent, data:{filtro:'no_verificada'}},
  {path:'**',redirectTo:''},
];

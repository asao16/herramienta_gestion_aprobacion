import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {VistaDetallesComponent} from '../vista-detalles/vista-detalles.component';
import {CommonModule} from '@angular/common';
import {ManipularListasService} from '../../../core/services/manipular-listas.service';
import {MappedPost} from '../../../shared/tipoLista'
import {ConfirmacionEliminarComponent} from '../confirmacion-eliminar/confirmacion-eliminar.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista-vereficada',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatPaginator
  ],
  templateUrl: './lista-vereficada.component.html',
  styleUrl: './lista-vereficada.component.css'
})
export class ListaVereficadaComponent implements OnInit {

  data: MappedPost[] = []; // Lista completa de datos
  pagedData: MappedPost[] = []; // Datos paginados
  pageSize = 7; // Tamaño de la página
  // pageSizeOptions = [5, 10, 20]; // Opciones de tamaño de página

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public detalles: MatDialog,
              private ManipularListasService: ManipularListasService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  mostrar_lista_verificada: boolean = false;

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      this.mostrar_lista_verificada = data['filtro'] === 'verificada';
      this.updatePagedData(0, this.pageSize); // Actualiza los datos paginados
    });

    this.ManipularListasService.fetchData().subscribe((data) => {
      this.data = data; // Actualiza los datos en el componente
      this.updatePagedData(0, this.pageSize); // Muestra la primera página
    });

  }

  obtenerElementos(): MappedPost[] {
    if (this.mostrar_lista_verificada) {
      return this.data.filter((item) =>
        item.estado === 'verificado' || item.estado === 'no-verificado'
      );
    } else {
      return this.data; // Devuelve todos los elementos
    }
  }


  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.updatePagedData(startIndex, endIndex);
  }

  updatePagedData(startIndex: number, endIndex: number): void {
    this.pagedData = this.data.slice(startIndex, endIndex); // Actualiza los datos paginados
  }

  eliminarElemento(item: MappedPost): void {
    const dialogRef = this.detalles.open(ConfirmacionEliminarComponent, {
      width: '300px',
      data: {mensaje: '¿Estás seguro de que quieres eliminar este elemento?'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ManipularListasService.eliminarElemento(item.id); // Elimina el elemento del localStorage
        this.data = this.ManipularListasService.getCachedData(); // Actualiza la lista de datos
        this.updatePagedData(0, this.pageSize); // Recarga los datos para reflejar los cambios
      }
    });
  }

  abrirDetalles(item: MappedPost) {
    const dialogRef = this.detalles.open(VistaDetallesComponent, {
      width: '500px', // Ancho del diálogo
      data: item // Pasa el elemento seleccionado al diálogo
    });
    // Maneja el cierre del diálogo
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // Si `result` es `true`, se eliminó el elemento
        this.data = this.ManipularListasService.getCachedData(); // Actualiza la lista de datos
        this.updatePagedData(this.paginator.pageIndex, this.paginator.pageSize); // Recarga los datos
      }
    });
  }

  onCheckboxChange(item: MappedPost): void {
    if (item.estado === 'indeterminado') {
      item.estado = 'verificado'; // Cambia a "verificado"
    } else if (item.estado === 'verificado') {
      item.estado = 'no-verificado'; // Cambia a "no-verificado"
    } else if (item.estado === 'no-verificado') {
      item.estado = 'indeterminado'; // Cambia a "indeterminado"
    }
    console.log('Estado actualizado:', item.estado); // Verifica el estado actualizado
    this.ManipularListasService.actualizarLocalStorage(this.data);

    // Forzar la detección de cambios
    this.cdr.detectChanges();
  }


}

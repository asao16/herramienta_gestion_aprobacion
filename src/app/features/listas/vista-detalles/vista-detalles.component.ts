import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardMdImage,
  MatCardSmImage,
  MatCardTitle
} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MappedPost} from '../../../shared/tipoLista';
import {ConfirmacionEliminarComponent} from '../confirmacion-eliminar/confirmacion-eliminar.component';
import {ManipularListasService} from '../../../core/services/manipular-listas.service';

@Component({
  selector: 'app-vista-detalles',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSmImage,
    MatCardMdImage,
    MatCardTitle,
    MatCheckbox,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './vista-detalles.component.html',
  styleUrl: './vista-detalles.component.css'
})
export class VistaDetallesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<VistaDetallesComponent>,
              private ManipularListasService: ManipularListasService) {
  }

  eliminarElemento(): void {
    this.ManipularListasService.eliminarElemento(this.data.id); // Elimina el elemento
    this.dialogRef.close(true); // Cierra el diálogo y devuelve `true` para indicar que se eliminó
  }

  onCheckboxChange(item: any): void {
    this.data.onCheckboxChange(item);
  }
}

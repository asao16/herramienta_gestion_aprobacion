import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {Post, MappedPost} from '../../shared/tipoLista'

@Injectable({
  providedIn: 'root'
})
export class ManipularListasService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=10'; // URL de JSONPlaceholder

  constructor(private http: HttpClient) { }

  //Obtener datos de JSONPlaceholder, mapearlos y almacenarlos en localStorage
  fetchData(): Observable<MappedPost[]> {
    const cachedData = this.getCachedData();
    if (cachedData.length > 0) {
      return of(cachedData); // Devuelve los datos en caché si existen
    }

    return this.http.get<Post[]>(this.apiUrl).pipe(
      // Mapear los datos para agregar una nueva propiedad
      map((data:Post[]) =>
        data.map((item) => ({
          ...item, // Copia todas las propiedades existentes
          estado: 'indeterminado', // Agrega una nueva propiedad
          imageUrl: this.getImageUrl(item.id) // Genera la URL de la imagen
        }))
      ),
      tap((data:MappedPost[]) => {
        // Almacena los datos mapeados en localStorage
        localStorage.setItem('cachedData', JSON.stringify(data));
        console.log('Datos mapeados y almacenados en localStorage:', data);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos:', error);
        return throwError(() => new Error('Error al obtener los datos'));
      })
    );
  }

  //generar la URL de la imagen
  getImageUrl(id: number): string {
    return `https://picsum.photos/200/200?random=${id}`; // Usa Lorem Picsum
    // return `https://via.placeholder.com/200?text=Post+${id}` //Este se cae a veces
  }

  //Obtener datos del localStorage
  getCachedData(): MappedPost[] {
    const cachedData = localStorage.getItem('cachedData');
    return cachedData ? JSON.parse(cachedData) : [];
  }

  actualizarLocalStorage(data: MappedPost[]): void {
    localStorage.setItem('cachedData', JSON.stringify(data));
  }

  // Eliminar un elemento del localStorage
  eliminarElemento(id: number): void {
    const cachedData = this.getCachedData();
    const updatedData = cachedData.filter((item) => item.id !== id); // Filtra el elemento a eliminar
    localStorage.setItem('cachedData', JSON.stringify(updatedData)); // Actualiza el localStorage
  }

}

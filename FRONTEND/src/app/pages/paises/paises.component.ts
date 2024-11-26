import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  paises: any[] = [];
  nuevoPais: string = '';
  botonHabilitado: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getPaises();
  }

  // Obtener todos los países
  getPaises(): void {
    this.apiService.getAll('paises').subscribe((data) => {
      this.paises = data.map((pais: any) => ({ ...pais, editando: false }));
    });
  }

  validarBoton(): void {
    this.botonHabilitado = this.nuevoPais.trim().length > 0;
  }

  // Crear un país
  agregarPais(): void {
    const data = { nombre: this.nuevoPais };
    this.apiService.create('paises', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'País creado con éxito', 'success'); // SweetAlert para éxito
        this.getPaises();
        this.nuevoPais = '';
      },
      (error) => {
        Swal.fire('Error', 'Error al crear el país', 'error'); // SweetAlert para error
      }
    );
  }

  // Habilitar edición para un país
  habilitarEdicion(pais: any): void {
    pais.editando = true;
  }

  // Editar un país
  editarPais(pais: any): void {
    const data = { id_pais: pais.id_pais, nombre: pais.nombre };
    this.apiService.update('paises', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'País actualizado con éxito', 'success'); // SweetAlert para éxito
        pais.editando = false;
        this.getPaises();
      },
      (error) => {
        Swal.fire('Error', 'Error al actualizar el país', 'error'); // SweetAlert para error
      }
    );
  }

  // Eliminar un país
  eliminarPais(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este país.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { id_pais: id };
        this.apiService.delete('paises', data).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'País eliminado con éxito', 'success');
            this.getPaises();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el país', 'error');
          }
        );
      }
    });
  }
}

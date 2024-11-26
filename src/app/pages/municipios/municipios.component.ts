import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';  // Importar SweetAlert2

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any[] = [];
  departamentos: any[] = [];
  nuevoMunicipio: string = '';
  departamentoSeleccionado: string = ''; // Inicializado como vacío
  isSubmitted: boolean = false; // Control de validación

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMunicipios();
    this.getDepartamentos();
  }

  // Obtener todos los municipios
  getMunicipios(): void {
    this.apiService.getAll('municipios').subscribe((data) => {
      this.municipios = data.map((municipio: any) => ({
        ...municipio,
        editando: false
      }));
    });
  }

  // Obtener todos los departamentos
  getDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe((data) => {
      this.departamentos = data;
    });
  }

  // Crear un municipio
  agregarMunicipio(): void {
    this.isSubmitted = true; // Marcar como enviado para validación
    if (!this.departamentoSeleccionado || !this.nuevoMunicipio.trim()) {
      Swal.fire('Error', 'Debes seleccionar un departamento y escribir el nombre del municipio.', 'error'); // SweetAlert para error
      return;
    }

    const data = { nombre: this.nuevoMunicipio, id_departamento: this.departamentoSeleccionado };
    this.apiService.create('municipios', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Municipio creado con éxito', 'success'); // SweetAlert para éxito
        this.getMunicipios();
        this.nuevoMunicipio = '';
        this.departamentoSeleccionado = ''; // Reiniciar selección
        this.isSubmitted = false;
      },
      (error) => {
        Swal.fire('Error', 'Error al crear el municipio', 'error'); // SweetAlert para error
      }
    );
  }

  // Habilitar edición para un municipio
  habilitarEdicion(municipio: any): void {
    municipio.editando = true;
  }

  // Editar un municipio
  editarMunicipio(municipio: any): void {
    const data = {
      id_municipio: municipio.id_municipio,
      nombre: municipio.nombre,
      id_departamento: municipio.id_departamento
    };
    this.apiService.update('municipios', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Municipio actualizado con éxito', 'success'); // SweetAlert para éxito
        municipio.editando = false;
        this.getMunicipios();
      },
      (error) => {
        Swal.fire('Error', 'Error al actualizar el municipio', 'error'); // SweetAlert para error
      }
    );
  }

  // Eliminar un municipio
  eliminarMunicipio(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este municipio.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { id_municipio: id };
        this.apiService.delete('municipios', data).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'Municipio eliminado con éxito', 'success'); // SweetAlert para éxito
            this.getMunicipios();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el municipio', 'error'); // SweetAlert para error
          }
        );
      }
    });
  }

  // Obtener el nombre del departamento por ID
  getDepartamentoNombre(id_departamento: number): string {
    const departamento = this.departamentos.find((d) => d.id_departamento === id_departamento);
    return departamento ? departamento.nombre : 'Desconocido';
  }
}

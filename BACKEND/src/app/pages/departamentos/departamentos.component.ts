import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];
  paises: any[] = [];
  nuevoDepartamento: string = '';
  paisSeleccionado: string | null = ''; // Valor inicial como null
  isSubmitted = false; // Estado para controlar la validación al enviar

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getPaises();
  }

  // Obtener todos los departamentos
  getDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe((data) => {
      this.departamentos = data.map((departamento: any) => ({
        ...departamento,
        editando: false
      }));
    });
  }

  // Obtener todos los países
  getPaises(): void {
    this.apiService.getAll('paises').subscribe((data) => {
      this.paises = data;
    });
  }

  // Crear un departamento
  agregarDepartamento(): void {
    if (!this.paisSeleccionado || !this.nuevoDepartamento.trim()) {
      Swal.fire('Error', 'Debes seleccionar un país y escribir el nombre del departamento.', 'error'); // SweetAlert para error
      return;
    }

    const data = { nombre: this.nuevoDepartamento, id_pais: this.paisSeleccionado };
    this.apiService.create('departamentos', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Departamento creado con éxito', 'success'); // SweetAlert para éxito

        // Actualizar lista de departamentos
        this.getDepartamentos();

        // Reiniciar los campos
        this.nuevoDepartamento = ''; // Limpiar input de departamento
        this.paisSeleccionado = '';  // Resetear select al valor inicial
      },
      (error) => {
        Swal.fire('Error', 'Error al crear el departamento', 'error'); // SweetAlert para error
      }
    );
  }

  // Habilitar edición para un departamento
  habilitarEdicion(departamento: any): void {
    departamento.editando = true;
  }

  // Editar un departamento
  editarDepartamento(departamento: any): void {
    const data = {
      id_departamento: departamento.id_departamento,
      nombre: departamento.nombre,
      id_pais: departamento.id_pais
    };
    this.apiService.update('departamentos', data).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Departamento actualizado con éxito', 'success'); // SweetAlert para éxito
        departamento.editando = false;
        this.getDepartamentos();
      },
      (error) => {
        Swal.fire('Error', 'Error al actualizar el departamento', 'error'); // SweetAlert para error
      }
    );
  }

  // Eliminar un departamento
  eliminarDepartamento(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este departamento.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { id_departamento: id };
        this.apiService.delete('departamentos', data).subscribe(
          (response) => {
            Swal.fire('Eliminado', 'Departamento eliminado con éxito', 'success'); // SweetAlert para éxito
            this.getDepartamentos();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el departamento', 'error'); // SweetAlert para error
          }
        );
      }
    });
  }

  // Obtener el nombre del país por ID
  getPaisNombre(id_pais: number): string {
    const pais = this.paises.find((p) => p.id_pais === id_pais);
    return pais ? pais.nombre : 'Desconocido';
  }
}

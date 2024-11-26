
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  empresas: any[] = [];
  nuevoColaborador: any = {
    nombre: '',
    edad: null,
    telefono: '',
    correo: '',
    id_empresa: null
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getColaboradores();
    this.getEmpresas();
  }

  // Obtener todos los colaboradores
  getColaboradores(): void {
    this.apiService.getAll('colaboradores').subscribe((data) => {
      this.colaboradores = data.map((colaborador: any) => ({
        ...colaborador,
        editando: false
      }));
    });
  }

  // Obtener todas las empresas
  getEmpresas(): void {
    this.apiService.getAll('empresas').subscribe((data) => {
      this.empresas = data;
    });
  }

  agregarColaborador(): void {
    const { nombre, edad, telefono, correo, id_empresa } = this.nuevoColaborador;
    let camposFaltantes: string[] = [];
  
    // Validación de los campos faltantes
    if (!nombre.trim()) camposFaltantes.push('Nombre');
    if (!edad) camposFaltantes.push('Edad');
    if (!telefono.trim()) camposFaltantes.push('Teléfono');
    if (!correo.trim()) camposFaltantes.push('Correo');
    if (!id_empresa) camposFaltantes.push('Empresa');
  
    // Si hay campos faltantes, mostrar el swal de advertencia
    if (camposFaltantes.length > 0) {
      Swal.fire({
        title: 'Campos faltantes',
        text: 'Te hace falta llenar los siguientes campos: ' + camposFaltantes.join(', '),
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return; // Detiene la ejecución de la función si hay campos faltantes
    }
  
    // Si todos los campos están completos, agregar el colaborador
    this.apiService.create('colaboradores', this.nuevoColaborador).subscribe(
      (response) => {
        Swal.fire({
          title: 'Colaborador creado',
          text: 'Colaborador creado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        // Refrescar la lista de colaboradores
        this.getColaboradores();
        // Resetear el formulario
        this.nuevoColaborador = { nombre: '', edad: null, telefono: '', correo: '', id_empresa: null };
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el colaborador',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
  

  // Habilitar edición para un colaborador
  habilitarEdicion(colaborador: any): void {
    // Mostrar una alerta de confirmación usando SweetAlert2 antes de habilitar la edición
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas habilitar la edición para este colaborador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, habilitar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        colaborador.editando = true;
        Swal.fire({
          title: 'Edición habilitada',
          text: 'Puedes editar los datos del colaborador ahora.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
  // Editar un colaborador
  editarColaborador(colaborador: any): void {
    // Mostrar una alerta de confirmación antes de actualizar los datos
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios realizados en este colaborador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar cambios',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id_colaborador: colaborador.id_colaborador,
          nombre: colaborador.nombre,
          edad: colaborador.edad,
          telefono: colaborador.telefono,
          correo: colaborador.correo,
          id_empresa: colaborador.id_empresa
        };
  
        this.apiService.update('colaboradores', data).subscribe(
          (response) => {
            Swal.fire({
              title: 'Actualización exitosa',
              text: 'Los datos del colaborador se actualizaron correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            colaborador.editando = false;
            this.getColaboradores();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al actualizar el colaborador.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }
  
  // Eliminar un colaborador
  eliminarColaborador(id_colaborador: number): void {
    // Mostrar una alerta de confirmación usando SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { id_colaborador: id_colaborador };
        this.apiService.delete('colaboradores', data).subscribe(
          (response) => {
            Swal.fire({
              title: 'Colaborador eliminado',
              text: 'El colaborador ha sido eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.getColaboradores();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el colaborador',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }
  

  // Obtener el nombre de la empresa por ID
  getEmpresaNombre(id_empresa: number): string {
    const empresa = this.empresas.find((e) => e.id_empresa === id_empresa);
    return empresa ? empresa.nombre_comercial : 'Desconocida';
  }
}


import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  editando = false; // Indica si se está editando un registro
  empresaIdEdicion: number | null = null; // Guarda el ID de la empresa a editar
  empresas: any[] = [];
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  departamentosTotales: any[] = [];
  municipiosTotales: any[] = [];
  nuevoNit = '';
  nuevaRazonSocial = '';
  nuevoNombreComercial = '';
  nuevoTelefono = '';
  nuevoCorreo = '';
  paisSeleccionado: number | null = null;
  departamentoSeleccionado: number | null = null;
  municipioSeleccionado: number | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getEmpresas();
    this.getPaises();
    this.getTodosLosDepartamentos();
    this.getTodosLosMunicipios();
  }

  // Obtener todas las empresas
  getEmpresas(): void {
    this.apiService.getAll('empresas').subscribe((data) => {
      this.empresas = data.map((empresa: any) => ({
        ...empresa,
        nombre_departamento: this.getDepartamentoNombre(empresa.id_departamento),
        nombre_municipio: this.getMunicipioNombre(empresa.id_municipio)
      }));
    });
  }

  getPaises(): void {
    this.apiService.getAll('paises').subscribe(
      (data) => (this.paises = data),
      () => {
        Swal.fire('Error', 'Hubo un problema al obtener la lista de países', 'error');
      }
    );
  }
  

  getTodosLosDepartamentos(): void {
    this.apiService.getAll('departamentos').subscribe(
      (data) => (this.departamentosTotales = data),
      () => {
        Swal.fire('Error', 'Hubo un problema al obtener todos los departamentos', 'error');
      }
    );
  }
  

  getTodosLosMunicipios(): void {
    this.apiService.getAll('municipios').subscribe(
      (data) => (this.municipiosTotales = data),
      () => {
        Swal.fire('Error', 'Hubo un problema al obtener todos los municipios', 'error');
      }
    );
  }
  

  getDepartamentos(): void {
    if (this.paisSeleccionado) {
      this.apiService.getAll(`departamentos.php?id_pais=${this.paisSeleccionado}`).subscribe(
        (data) => (this.departamentos = data),
        () => {
          Swal.fire('Error', 'Hubo un problema al obtener los departamentos', 'error');
        }
      );
    } else {
      this.departamentos = [];
    }
  }
  

  getMunicipios(): void {
    if (this.departamentoSeleccionado) {
      this.apiService.getAll(`municipios.php?id_departamento=${this.departamentoSeleccionado}`).subscribe(
        (data) => (this.municipios = data),
        () => {
          Swal.fire('Error', 'Hubo un problema al obtener los municipios', 'error');
        }
      );
    } else {
      this.municipios = [];
    }
  }
  

  onPaisChange(): void {
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
    this.getDepartamentos();
  }

  onDepartamentoChange(): void {
    this.municipioSeleccionado = null;
    this.getMunicipios();
  }

  agregarEmpresa(): void {
    // Verificar los campos vacíos
    const camposFaltantes: string[] = [];
  
    if (!this.nuevoNit.trim()) camposFaltantes.push('NIT');
    if (!this.nuevaRazonSocial.trim()) camposFaltantes.push('Razón Social');
    if (!this.nuevoNombreComercial.trim()) camposFaltantes.push('Nombre Comercial');
    if (!this.nuevoTelefono.trim()) camposFaltantes.push('Teléfono');
    if (!this.nuevoCorreo.trim()) camposFaltantes.push('Correo');
    if (this.departamentoSeleccionado === null) camposFaltantes.push('Departamento');
    if (this.municipioSeleccionado === null) camposFaltantes.push('Municipio');
  
    if (camposFaltantes.length > 0) {
      // Mostrar un Swal con los campos faltantes
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: `Por favor completa los siguientes campos antes de guardar: ${camposFaltantes.join(', ')}.`,
      });
      return;
    }
  
    // Definir explícitamente el tipo de `data` y permitir `id_empresa` como opcional
    const data: {
      nit: string;
      razon_social: string;
      nombre_comercial: string;
      telefono: string;
      correo: string;
      id_departamento: number | null;
      id_municipio: number | null;
      id_empresa?: number; // Propiedad opcional
    } = {
      nit: this.nuevoNit.trim(),
      razon_social: this.nuevaRazonSocial.trim(),
      nombre_comercial: this.nuevoNombreComercial.trim(),
      telefono: this.nuevoTelefono.trim(),
      correo: this.nuevoCorreo.trim(),
      id_departamento: this.departamentoSeleccionado,
      id_municipio: this.municipioSeleccionado,
    };
  
    if (this.editando && this.empresaIdEdicion !== null) {
      // Asignar `id_empresa` solo si se está editando
      data.id_empresa = this.empresaIdEdicion;
  
      this.apiService.update('empresas', data).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Empresa actualizada con éxito',
          });
          this.resetForm();
          this.getEmpresas();
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar la empresa',
          });
        }
      );
    } else {
      // Lógica de creación
      this.apiService.create('empresas', data).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Empresa creada con éxito',
          });
          this.resetForm();
          this.getEmpresas();
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear la empresa',
          });
        }
      );
    }
  }
  
  
  
  
  eliminarEmpresa(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { id_empresa: id };
        this.apiService.delete('empresas', data).subscribe(
          () => {
            Swal.fire('Eliminado', 'La empresa ha sido eliminada con éxito', 'success');
            this.getEmpresas(); // Actualiza la lista después de eliminar.
          },
          () => Swal.fire('Error', 'Hubo un problema al eliminar la empresa', 'error')
        );
      }
    });
  }

  camposFormularioValidos(): boolean {
    return (
      !!this.nuevoNit.trim() &&                
      !!this.nuevaRazonSocial.trim() &&         
      !!this.nuevoNombreComercial.trim() &&     
      !!this.nuevoTelefono.trim() &&            
      !!this.nuevoCorreo.trim() &&              
      this.paisSeleccionado !== null &&         
      this.departamentoSeleccionado !== null && 
      this.municipioSeleccionado !== null     
    );
  }
  

  resetForm(): void {
    this.editando = false;
    this.empresaIdEdicion = null;
    this.nuevoNit = '';
    this.nuevaRazonSocial = '';
    this.nuevoNombreComercial = '';
    this.nuevoTelefono = '';
    this.nuevoCorreo = '';
    this.paisSeleccionado = null;
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
    this.departamentos = [];
    this.municipios = [];
  }
  

  getDepartamentoNombre(id_departamento: number): string {
    const departamento = this.departamentosTotales.find((d) => d.id_departamento === id_departamento);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  getMunicipioNombre(id_municipio: number): string {
    const municipio = this.municipiosTotales.find((m) => m.id_municipio === id_municipio);
    return municipio ? municipio.nombre : 'Desconocido';
  }

  editarEmpresa(empresa: any): void {
    this.editando = true;
    this.empresaIdEdicion = empresa.id_empresa;
    this.nuevoNit = empresa.nit;
    this.nuevaRazonSocial = empresa.razon_social;
    this.nuevoNombreComercial = empresa.nombre_comercial;
    this.nuevoTelefono = empresa.telefono;
    this.nuevoCorreo = empresa.correo;
  
    // Refrescar todas las listas de selección
    this.getPaises();
    this.getTodosLosDepartamentos();
    this.getTodosLosMunicipios();
  
    // Reiniciar selección en los select
    this.paisSeleccionado = null;
    this.departamentoSeleccionado = null;
    this.municipioSeleccionado = null;
  }
  

  
}

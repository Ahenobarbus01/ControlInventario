import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-registro-inventario',
  templateUrl: './registro-inventario.component.html',
  styleUrls: ['./registro-inventario.component.scss'],
  providers: [FormBuilder]
})
export class RegistroInventarioComponent implements OnInit {
  inventarioForm!: FormGroup;
  registroExitoso: boolean = false;
  errorRegistro: string = '';

  constructor(private fb: FormBuilder, private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      numeroSerie: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inventarioForm.valid) {
      this.inventarioService.registrarPieza(this.inventarioForm.value).subscribe(
        response => {
          this.registroExitoso = true;
          this.errorRegistro = '';
          console.log('Pieza registrada exitosamente:', response);
          this.inventarioForm.reset();
        },
        error => {
          this.registroExitoso = false;
          this.errorRegistro = 'Ocurrió un error al registrar la pieza. Por favor, inténtelo de nuevo más tarde.';
          console.error('Error al registrar la pieza:', error);
        }
      );
    } else {
      // Marcar los campos como tocados para mostrar mensajes de error si es necesario
      this.inventarioForm.markAllAsTouched();
    }
  }
}
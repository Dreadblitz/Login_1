import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonalCoysService } from '../personal-coys.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent {
  @Output() onAgregarRegistro: EventEmitter<any> = new EventEmitter();

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personalCoysService: PersonalCoysService,
    public dialogRef: MatDialogRef<PersonalFormComponent>
  ) {
    this.registerForm = this.formBuilder.group({
      Legajo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Cargo: ['', Validators.required],
      Dni: ['', Validators.required],
      Nro_Cell: ['', Validators.required],
      Mail_Empresa: ['', Validators.required],
      Mail_Personal: ['', Validators.required]
    });
  }

  async agregarRegistro() {
    if (this.registerForm.valid) {
      const nuevoRegistro = this.registerForm.value;
      await this.personalCoysService.agregarPersonalCoys(nuevoRegistro); // Llamar al método "agregarPersonalCoys"
      this.onAgregarRegistro.emit(nuevoRegistro);
      this.registerForm.reset();
      this.dialogRef.close();
    }
  }
}

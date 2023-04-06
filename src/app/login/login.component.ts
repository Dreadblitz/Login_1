import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  hide: boolean = true;
  errorMensaje: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(): Promise<void> {
    if (this.usuario && this.contrasena) {
      try {
        await this.authService.login(this.usuario, this.contrasena);
        this.errorMensaje = '';
        console.log('Usuario:', this.usuario);
        console.log('Contraseña:', this.contrasena);

        if (this.usuario === 'sistemascoys@gmail.com') {
          this.router.navigate(['/personal']);
        } else {
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.errorMensaje = 'Usuario o contraseña incorrectos';
      }
    }
  }

  // Desactivar la validación en tiempo real
  disableRealTimeValidation(ngModel: NgModel) {
    ngModel.control.markAsUntouched();
  }

  clearError(): void {
    this.errorMensaje = '';
  }
}

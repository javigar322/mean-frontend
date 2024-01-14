import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  errorMessage = '';
  user = {
    name: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      (err) => {
        if (err.status === 401 && err.error && err.error.message) {
          // Manejar errores específicos de inicio de sesión
          this.errorMessage = err.error.message;
        } else if (err.error && err.error.errors) {
          // Manejar errores de validación
          const validationErrors = err.error.errors;
          this.errorMessage =
            this.getConcatenatedErrorMessages(validationErrors);
        } else {
          // Manejar otros errores, como errores internos del servidor
          this.errorMessage = 'Error en el formulario';
        }
      },
    );
  }
  private getConcatenatedErrorMessages(errors: any[]): string {
    return errors.map((error) => error.msg).join(', ');
  }
}

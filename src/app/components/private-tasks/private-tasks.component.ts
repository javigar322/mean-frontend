import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-private-tasks',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './private-tasks.component.html',
  styleUrl: './private-tasks.component.scss',
})
export class PrivateTasksComponent {
  errorMessage = '';
  successMessage = '';
  tasks: any = [];
  userId = '';
  user: User = {} as User;
  newUser = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private tasksService: TasksService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userId = this.userService.getUserByToken()._id;
    this.tasksService.getTasks().subscribe(
      (res: any) => {
        this.tasks = res;
      },
      (err) => console.log(err),
    );
    this.userService.getUser(this.userId).subscribe(
      (res) => {
        this.user = res.user;
        this.newUser.name = this.user.name;
        if (this.user.email) {
          this.newUser.email = this.user.email;
        }
        this.newUser.password = this.user.password;
      },
      (err) => console.log(err),
    );
  }
  updateUser() {
    this.user.name = this.newUser.name;
    this.user.email = this.newUser.email;
    this.userService.updateUser(this.user).subscribe(
      (res) => {
        console.log(res);
        this.successMessage = 'usuario actualizado';
        this.errorMessage = '';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      (err) => {
        if (err.error && err.error.errors) {
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

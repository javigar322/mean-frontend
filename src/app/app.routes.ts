import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  {
    path: 'private',
    component: PrivateTasksComponent,
    canActivate: [authGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];

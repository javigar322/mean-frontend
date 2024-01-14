import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenizeReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + authService.getToken(),
    },
  });
  return next(tokenizeReq);
};

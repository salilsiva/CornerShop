import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, tap } from 'rxjs';
import { LoggerService } from '../core/logger.service';

const KEY = 'cornershop.jwt';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const logger = inject(LoggerService);
  const token = localStorage.getItem(KEY);

  if(token){
    logger.debug('Attaching JWT token to request', req.url);
  }
  // Attach token if it exists
  const authReq = token
    ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

      return next(authReq).pipe(
    tap(() => {
      logger.info('HTTP request successful', req.method, req.url);
    }),
    catchError(err => {
      logger.error('HTTP request failed', req.method, req.url, err);

      if (err.status === 401) {
        logger.warn('Unauthorized — redirecting to login');
        localStorage.removeItem('token');
        router.navigateByUrl('/login');
      }

      return throwError(() => err);
    })
  );
};
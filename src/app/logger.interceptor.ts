import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
  // Write your logic 
  console.log("Inside interceptor")
  const token = localStorage.getItem('token');
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(req)
}




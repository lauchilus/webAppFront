import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
  // Write your logic 
  console.log("Inside interceptor")
  const token = localStorage.getItem('token');
  console.log(req.url)
  if(req.urlWithParams.includes("register") || req.urlWithParams.includes("login") || req.urlWithParams.includes("verifyuser")){
    return next(req);
  }
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(req)
}




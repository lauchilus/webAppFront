import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { FirebaseError } from 'firebase/app';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const loggerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Write your logic 
  console.log("Inside interceptor")
  const token = localStorage.getItem('token');
  console.log(req.url+"QAAA")
  if (req.urlWithParams.includes("register") || req.urlWithParams.includes("login") || req.urlWithParams.includes("verifyuser")) {
    return next(req);
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      uid : `${localStorage.getItem("uid")}`
    }
  })

  return next(req).pipe(
    catchError(error => {
      let errorMessage = '';
      if (error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // backend error
        errorMessage = `Server-side error: ${error.status} ${error.message}`;
      }
      
      // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
      alert(errorMessage);
      return throwError(errorMessage);
    })
  );
}






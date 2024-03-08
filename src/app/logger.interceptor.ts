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
  console.log("Inside interceptor" + req.method)
  const token = localStorage.getItem('token');
  console.log(req.url + "URL" + "METHOD"+ req.method) 
  if (req.urlWithParams.includes("register") || req.urlWithParams.includes("login") || req.urlWithParams.includes("verifyuser")) {
    return next(req);
  }

  if(req.method === "GET"){
    return next(req);
  }else{
     req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      uid : `${localStorage.getItem("UID")}`
    }
  })
  }
 

  return next(req);
}






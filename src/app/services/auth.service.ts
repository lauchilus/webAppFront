import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: any;

  UrlRegisterback : string = `http://localhost:8080/auth/register`

  firebaseConfig = {
    apiKey: "AIzaSyBrUuNI_JjJngqir_fbymc1YL7OECJyx6g",
    authDomain: "gamelist-2d76b.firebaseapp.com",
    projectId: "gamelist-2d76b",
    storageBucket: "gamelist-2d76b.appspot.com",
    messagingSenderId: "1047278251796",
    appId: "1:1047278251796:web:6275338dec24e553c99c01"
  };

  constructor(private httpClient: HttpClient) {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
   }

  Register(email: string,pass:string){
    createUserWithEmailAndPassword(this.auth, email, pass)
		  .then(async (userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
        localStorage.setItem('token', await user.getIdToken())

		    alert("Registration successfully!!");
		    // ...
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    // ..
		    console.log(errorMessage);
		    alert(error);
		  });		  		  
  }

  SaveUserDB(UID: string, email: string){
    const registerData = {
      email : email,
      userUID: UID
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    this.httpClient.post(this.UrlRegisterback,registerData,httpOptions);
  }

  
    login(email: string, password: string): Observable<any> {
      return new Observable((observer) => {
        this.auth.signInWithEmailAndPassword(email, password)
          .then((userCredential: { user: { getIdToken: () => any; }; }) => {
            const token = userCredential.user?.getIdToken();
            observer.next(token);
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      });
  }
}

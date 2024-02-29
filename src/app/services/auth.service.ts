import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: any;
  loggedIn = false;
  private _miVariable = new BehaviorSubject<boolean>(false);

  baseUrl: string = `http://localhost:8080/auth`

  firebaseConfig = {
    apiKey: "AIzaSyBrUuNI_JjJngqir_fbymc1YL7OECJyx6g",
    authDomain: "gamelist-2d76b.firebaseapp.com",
    projectId: "gamelist-2d76b",
    storageBucket: "gamelist-2d76b.appspot.com",
    messagingSenderId: "1047278251796",
    appId: "1:1047278251796:web:6275338dec24e553c99c01"
  };

  constructor(private httpClient: HttpClient, private route: Router) {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);


  }


   
checkUser(email: string, username: string){
  const urlCheck = `${this.baseUrl}/verifyuser?username=${username}&email=${email}`;

  // Retornar el observable resultante de la petición HTTP
  return this.httpClient.get<boolean>(urlCheck);
}


Register(email: string, pass: string, username: string) {

  createUserWithEmailAndPassword(this.auth, email, pass)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('token', await user.getIdToken(true))
      localStorage.setItem('UID', await user.uid)
      const emaill = user.email;
      const UID = user.uid
      this._miVariable.next(true);
      this.SaveUserDB(UID, email, username);
      alert("Registration successfully!!");
      this.loggedIn = true
      this.route.navigateByUrl("/profile/" + localStorage.getItem('UID'))
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

SaveUserDB(UID: string, email: string, username: string) {
  const registerData = {
    email: email,
    userUID: UID,
    username: username
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }),
  };
  this.httpClient.post(`${this.baseUrl}/register`, registerData, httpOptions).subscribe(
    response => console.log('Solicitud exitosa', response),
    error => console.error('Error en la solicitud', error)
  );;
}


login(email: string, password: string) {
  return signInWithEmailAndPassword(this.auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem('token', await user.getIdToken())
      localStorage.setItem('UID', await user.uid)
      console.log(user);
      this.loggedIn = true;
      this._miVariable.next(true);
      alert(user.email + " Login successfully!!!");
      this.route.navigateByUrl("/profile/" + localStorage.getItem('UID'))
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
};


checkIfLoged() {
  const token = localStorage.getItem('token');
  if (token === null) return false;
  // Comprobar si el token es válido
  return this.auth.getIdToken(true);
}

logOut() {

  this.auth.signOut();
  localStorage.clear();
  this.loggedIn = false;
  this._miVariable.next(false);
}

isLogged(){
  console.log(this._miVariable)
  return this._miVariable.asObservable();
}

async renewToken(): Promise<void> {
  try {
    const user = this.auth.currentUser;
    if (user) {
      const newToken = await user.getIdToken(true);
      this.setToken(newToken);
    }
  } catch (error) {
    console.error('Error renovando el token:', error);
    // Manejar el error según tus necesidades
  }
}

getToken(): string | null {
  return localStorage.getItem('token');
}

setToken(token: string): void {
  localStorage.setItem('token', token);
}

removeToken(): void {
  localStorage.removeItem('token');
}

}

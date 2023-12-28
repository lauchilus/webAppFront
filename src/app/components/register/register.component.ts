import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { AuthSettings, createUserWithEmailAndPassword, getAuth, getIdToken } from "firebase/auth";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public user !: Observable<any>;

  email : string = "";
  pass : string = "";
  

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

  constructor(private httpClient: HttpClient, private route: Router) {
    
   }
  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
  }

  
   

  Register(){
    createUserWithEmailAndPassword(this.auth, this.email, this.pass)
		  .then(async (userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
        localStorage.setItem('token', await user.getIdToken())
        localStorage.setItem('UID', await user.uid)
        const email = user.email;
        const UID = user.uid
        this.SaveUserDB(UID,this.email);
		    alert("Registration successfully!!");
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
    this.httpClient.post(this.UrlRegisterback,registerData,httpOptions).subscribe(
      response => console.log('Solicitud exitosa', response),
      error => console.error('Error en la solicitud', error)
    );;
  }
	  
  }
  


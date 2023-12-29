import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { AuthSettings, createUserWithEmailAndPassword, getAuth, getIdToken } from "firebase/auth";
import { NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,HttpClientModule,MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email: string = '';
  pass: string = '';
  usernameReg: string = '';

  userAvailable = false;

  auth: any;

  private usernameSubject = new Subject<string>();

  firebaseConfig = {
    apiKey: 'AIzaSyBrUuNI_JjJngqir_fbymc1YL7OECJyx6g',
    authDomain: 'gamelist-2d76b.firebaseapp.com',
    projectId: 'gamelist-2d76b',
    storageBucket: 'gamelist-2d76b.appspot.com',
    messagingSenderId: '1047278251796',
    appId: '1:1047278251796:web:6275338dec24e553c99c01',
  };

  constructor(
    private httpClient: HttpClient,
    private route: Router,
    private authService: AuthService
  ) {
    this.usernameSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((user:string) => this.verifyUsername(user))
      )
      .subscribe((available: boolean) => {
        this.userAvailable = available;
      });
  }

  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
  }

  Register() {
    console.log(this.usernameReg)
    console.log(this.email)
    this.authService.checkUser(this.email, this.usernameReg).subscribe(
      (isUserAvailable: boolean) => {
        if (!isUserAvailable) {
          // Si el usuario está disponible, realiza el registro
          this.registerRegister();
        } else {
          // Si el usuario no está disponible, maneja la situación
          alert('Username or Email already in Use.');
        }
      },
      (error: any) => {
        // Manejar el error en caso de que la verificación del usuario falle
        console.error( error);
      }
    );
  }

  registerRegister(){
    this.authService.Register(this.email,this.pass,this.usernameReg)
  }

  onUsernameChange(username: string) {
    this.usernameSubject.next(username);
  }

  verifyUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `http://localhost:8080/user/verify?username=${this.usernameReg}`
    );
  }
  }
  


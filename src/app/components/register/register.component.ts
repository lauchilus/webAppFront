import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  email : string = "";
  pass : string = "";
  auth: any;

  
  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    console.log(app);
    console.log(this.auth)
  }

  
   firebaseConfig = {
    apiKey: "AIzaSyBrUuNI_JjJngqir_fbymc1YL7OECJyx6g",
    authDomain: "gamelist-2d76b.firebaseapp.com",
    projectId: "gamelist-2d76b",
    storageBucket: "gamelist-2d76b.appspot.com",
    messagingSenderId: "1047278251796",
    appId: "1:1047278251796:web:6275338dec24e553c99c01"
  };

  Register(){
     console.log("AAAAAAAAAAAAAAAAAAAAAA")
		  //For new registration
		  createUserWithEmailAndPassword(this.auth, this.email, this.pass)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
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
	  //----- End
  }
  


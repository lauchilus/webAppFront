import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  route: boolean = false ;
  authButton !: boolean ;
  private  value = false;
  userId = localStorage.getItem("UID");;
  constructor(private router: Router,private authService: AuthService,) {}
  
  ngOnInit(): void {
    this.authService.isLogged().subscribe((value: boolean) => {
      this.authButton = value;
    });
    this.route= this.router.url.includes("home");
  }


  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    let searchTerm : string = (<HTMLInputElement>document.getElementById("search-navbar")).value; 
    if (event.key === 'Enter' && searchTerm.length > 0) {
      // Navegar a la URL deseada utilizando el término de búsqueda
     
      console.log(searchTerm+"AAAAAAAAAAAA")
      this.router.navigate(['/search/', searchTerm]);
      
    }
  }

  goToProfile(){
    if(this.authService.isLogged() && localStorage.getItem('UID') !== null){

      this.router.navigateByUrl(`/profile/${localStorage.getItem('UID')}`)
    }else{
      alert("Please Login");
      this.router.navigateByUrl('/login');
    }
  }


  manageUser() {
    if(this.authButton){
      this.authService.logOut();
      this.router.navigateByUrl("/")
    }else{
      this.router.navigateByUrl("/login");
    }
    }

    isLogged(){
      
    }

}

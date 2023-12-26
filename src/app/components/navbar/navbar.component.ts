import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userId = 3;
  constructor(private router: Router) {}

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Navegar a la URL deseada utilizando el término de búsqueda
      let searchTerm : string = (<HTMLInputElement>document.getElementById("search-navbar")).value; 
      console.log(searchTerm+"AAAAAAAAAAAA")
      this.router.navigate(['/search/', searchTerm]);
    }
  }
}

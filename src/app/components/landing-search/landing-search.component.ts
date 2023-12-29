import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-landing-search',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './landing-search.component.html',
  styleUrl: './landing-search.component.css'
})
export class LandingSearchComponent {

  searchTerm: string = '';
  offset : number = this.paginat.getOffset();

  constructor(private router: Router,
    private paginat : PaginationService) {}

  searchGame(game: string){
    console.log(game);
    this.router.navigateByUrl('search/'+game+'?offset='+this.offset);
  }

  nextPage(game: string) {
    const offset = this.paginat.getOffset() + 12;
    this.paginat.setOffset(offset);
    this.searchGame(game);
    }
    previousPagination(game: string) {
      const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
      this.searchGame(game);
    }

    @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Navegar a la URL deseada utilizando el término de búsqueda
      let searchTerm : string = (<HTMLInputElement>document.getElementById("search-landing")).value; 
      console.log(searchTerm+"AAAAAAAAAAAA")
      this.router.navigate(['/search/', searchTerm]);
      
    }
  }
}

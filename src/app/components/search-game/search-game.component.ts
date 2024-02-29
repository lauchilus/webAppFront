import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationService } from '../../services/pagination.service';
import { Gameslist } from '../../models/gameslist';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamesSearchServiceService } from '../../services/games-search-service.service';

@Component({
  selector: 'app-search-game',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search-game.component.html',
  styleUrl: './search-game.component.css'
})
export class SearchGameComponent implements OnInit {
  
  listGames : any[] = [];
  offset: number = 0;
 

 
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,private paginat: PaginationService,private route: ActivatedRoute,private searchService: GamesSearchServiceService) {}

    ngOnInit(): void {
      
      this.route.params.subscribe(params =>{
        const game = this.route.snapshot.params['game'];
        this.fetchDataListSearch(game);

      })
      
      this.offset = this.paginat.getOffset()
      
  }

  fetchDataListSearch(game: string) {
    this.searchService.fetchDataListSearch(game,this.offset).subscribe((data: any) => {
        console.log(data);

        this.listGames = data.map((games: any) => {
          return {
            ...games,
            imageUrlTrust: this.getSafeImageUrl(games.imageUrl)
          };
        });
      });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  nextPage() {
    const game = this.route.snapshot.params['game'];
    const offset = this.paginat.getOffset() + 12;
    this.paginat.setOffset(offset);
    console.log(this.offset)
    this.offset+=12;
    console.log(this.offset)
    this.fetchDataListSearch(game);
    }
    previousPagination() {
      const game = this.route.snapshot.params['game'];
      const offset = Math.max(0, this.offset - 12);
    this.paginat.setOffset(offset);
      this.fetchDataListSearch(game);
    }

 
}

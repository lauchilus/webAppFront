import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationService } from '../../services/pagination.service';
import { Gameslist } from '../../models/gameslist';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-game',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search-game.component.html',
  styleUrl: './search-game.component.css'
})
export class SearchGameComponent implements OnInit {
  
  listGames : Gameslist[] = [];
  offset: number = 0;
 

 
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,private paginat: PaginationService,private route: ActivatedRoute) {}

    ngOnInit(): void {
      const game = this.route.snapshot.params['game'];
      console.log(game+"aaaa")
      this.fetchDataList(game);
      
  }

  fetchDataList(game: string) {
    this.httpClient.get(`http://localhost:8080/games/a/${game}?offset=`+this.paginat.getOffset())
      .subscribe((data: any) => {
        console.log(data);

        this.listGames = data.map((games: Gameslist) => {
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
    this.fetchDataList(game);
    }
    previousPagination() {
      const game = this.route.snapshot.params['game'];
      const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
      this.fetchDataList(game);
    }

 
}

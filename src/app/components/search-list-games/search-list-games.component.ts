import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Gameslist } from '../../models/gameslist';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { GamesSearchServiceService } from '../../services/games-search-service.service';
import { PaginationService } from '../../services/pagination.service';


@Component({
  selector: 'app-search-list-games',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search-list-games.component.html',
  styleUrl: './search-list-games.component.css'
})
export class SearchListGamesComponent implements OnInit {


  listGames : Gameslist[] = [];
  offset: number = 0;
 

 
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,private paginat: PaginationService,
    private searchService: GamesSearchServiceService) {}

  ngOnInit(): void {
    this.offset = this.paginat.getOffset();
    console.log(this.offset);
    this.fetchDataList(0);
  }

  fetchDataList(offset: number) {
    this.offset = this.paginat.getOffset();
    this.searchService.fetchDataList(this.offset)
      .subscribe((data: any) => {
        console.log(data);

        this.listGames = data.map((game: Gameslist) => {
          return {
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.imageUrl)
          };
        });
      });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  nextPage() {
    const offset = this.paginat.getOffset() + 12;
    this.paginat.setOffset(offset);
    this.fetchDataList(this.offset+12);
    }
    previousPagination() {
      const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
      this.fetchDataList(Math.max(0, this.offset - 12));
    }
  
}







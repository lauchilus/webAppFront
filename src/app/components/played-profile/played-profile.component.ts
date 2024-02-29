import { Component, OnInit } from '@angular/core';
import { Played } from '../../models/played';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../services/pagination.service';
import { PlayedService } from '../../services/played.service';

@Component({
  selector: 'app-played-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './played-profile.component.html',
  styleUrl: './played-profile.component.css'
})
export class PlayedProfileComponent implements OnInit{
  
  userId = localStorage.getItem("UID"); ;
  playedList : Played[] = [];
  page : number = 0;
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute,private paginat: PaginationService,private playedService: PlayedService) {}
  ngOnInit(): void {
    this.page = this.paginat.getOffset();
    this.fetchDataPlayed(this.page);
  }

  fetchDataPlayed(page : number) {
    if(this.userId!=null){
      this.playedService.fetchDataPlayed(this.userId,page)
      .subscribe((data: any) => {
        console.log(data);

        this.playedList = data.map((game: Played) => {
          console.log(game.gameImage);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.gameImage)
          }
          
          ;
        });
      });
    }
    
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }


  nextPage() {
    const offset = this.paginat.getOffset() + 1;
    this.paginat.setOffset(offset);
    this.fetchDataPlayed(offset);
    }
    previousPagination() {
      const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
      this.fetchDataPlayed(Math.max(0, this.page - 12));
    }

}

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Gameslist } from '../../models/gameslist';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-backlog-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './backlog-profile.component.html',
  styleUrl: './backlog-profile.component.css'
})
export class BacklogProfileComponent implements OnInit {

  listGames : Gameslist[] = [];
  offset: number = 0;
 

 
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,private paginat: PaginationService,private route: ActivatedRoute) {}

    ngOnInit(): void {
      console.log("aaaa")
      this.fetchDataList();
      this.offset = this.paginat.getOffset()
      
  }

  fetchDataList() {
    this.httpClient.get(`http://localhost:8080/backlog?userId=${localStorage.getItem('UID')}`)
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
    this.fetchDataList();
    }
    previousPagination() {
      const game = this.route.snapshot.params['game'];
      const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
      this.fetchDataList();
    }

 
}


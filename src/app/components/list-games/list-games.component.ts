import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { Gameslist } from '../../models/gameslist';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ListInformation } from '../../services/list-information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.css'
})
export class ListGamesComponent implements OnInit {

  userId = localStorage.getItem("UID");
  list !: any;
  listGames !: Gameslist[];

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: Router, private listInfo: ListInformation, private router: ActivatedRoute) {}

  ngOnInit(): void {
    
    
      this.list = this.router.snapshot.paramMap.get("listId");
      this.fetchDataPlayed(this.list);
    
    
  }

  fetchDataPlayed(list: List) {
    this.httpClient.get(`http://ec2-52-200-236-21.compute-1.amazonaws.com/list/games?collectionID=${this.list}`)
      .subscribe((data: any) => {
        console.log(data);

        this.listGames = data.map((game: List) => {
          console.log(game.imageUrl);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.imageUrl)
          }
          
          ;
        });
      });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

 


}

import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListInformation } from '../../services/list-information';

@Component({
  selector: 'app-lists-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lists-profile.component.html',
  styleUrl: './lists-profile.component.css'
})
export class ListsProfileComponent implements OnInit {

  objectToPass !: any ;
  listsUser !: List[]
  userId = 3;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    this.httpClient.get(`http://localhost:8080/list?userID=${this.userId}`)
      .subscribe((data: any) => {
        console.log(data);

        this.listsUser = data.map((game: List) => {
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
 
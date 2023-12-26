import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gameslist } from '../../models/gameslist';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { Favorite } from '../../models/favorite';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  
  urlTrust = "";
  userId!: number;
  favGames:Favorite[] = [];
  reviews: Review[] = [];
  


  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.fetchDataFavorites();
    this.fetchDataReviews();
  }
  
  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

fetchDataFavorites() {
    
    this.httpClient.get(`http://localhost:8080/favorite/profile?userId=${3}`)
      .subscribe((data: any) => {
        console.log(data);

        this.favGames = data.map((game: Favorite) => {
          console.log(game.gameImageUrl);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.gameImageUrl)
          }
          
          ;
        });
      });
  }

  fetchDataReviews() {
    
    this.httpClient.get(`http://localhost:8080/reviews/profile?userId=${this.userId}`)
      .subscribe((data: any) => {
        console.log(data);

        this.reviews = data.map((review: Review) => {
          return {
            ...review,
            imageUrlTrust: this.getSafeImageUrl(review.gameImage)
          };
        });
      });
  }

}

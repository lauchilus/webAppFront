import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';

@Component({
  selector: 'app-reviews-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reviews-profile.component.html',
  styleUrl: './reviews-profile.component.css'
})
export class ReviewsProfileComponent {

  userId !:number ;
  reviews : Review[] = [];
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    this.httpClient.get(`http://localhost:8080/reviews?userId=${this.userId}`)
      .subscribe((data: any) => {
        console.log(data);

        this.reviews = data.map((game: Review) => {
          console.log(game.gameImage);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.gameImage)
          }
          
          ;
        });
      });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

}

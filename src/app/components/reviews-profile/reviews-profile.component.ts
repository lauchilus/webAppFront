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

  userId = localStorage.getItem("UID");
  reviews : Review[] = [];
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    this.httpClient.get(`http://ec2-52-200-236-21.compute-1.amazonaws.com/reviews?userId=${this.userId}`)
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

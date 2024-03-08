import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

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
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private reviewService: ReviewService) {}
  ngOnInit(): void {
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    const id = this.userId;
    if (id !== null) {
      this.reviewService.GetAllReviewsFromUser(id)
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
    } else {
      // Manejar el caso en que miElemento es nulo
      console.log("El elemento no está presente en el Local Storage");
    }
    
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index);
  }

}

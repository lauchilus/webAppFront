import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.css'
})
export class ReviewDetailsComponent implements OnInit {
  id !: string;
  reviews !: any;
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private reviewService: ReviewService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['reviewId']
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    this.reviewService.GetReviewsForProfileDisplay(this.id)
      .subscribe((data: any) => {
        console.log(data);

        this.reviews = data
        
      });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

}


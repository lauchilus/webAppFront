import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { ReviewPost } from '../models/review-post';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl: string = 'http://localhost:8080/reviews';

  constructor(private httpClient: HttpClient) { }


  AddReview(data: any){
    return 
  }

}

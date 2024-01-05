import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { ReviewPost } from '../models/review-post';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl: string = 'http://ec2-52-200-236-21.compute-1.amazonaws.com/reviews';

  constructor(private httpClient: HttpClient) { }


  AddReview(data: any){
    return 
  }

}

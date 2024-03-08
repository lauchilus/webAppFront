import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { ReviewPost } from '../models/review-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl: string = 'http://localhost:8080/api/v1/reviews';

  constructor(private httpClient: HttpClient) { }


  GetAllReviewsFromUser(userId: string) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`)
      
  }

  GetReviewsForProfileDisplay(id: string) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/profile/${id}`)      
  }

  GetReviewsDetails(id: string) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${id}`)      
  }

  PostReview(body :ReviewPost): Observable<any>{
    return this.httpClient.post(this.baseUrl,body);
  }

  


}

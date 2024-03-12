import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { ReviewPost } from '../models/review-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  baseUrl: string = 'https://gamelist-backend-lauchilus.koyeb.app/api/v1/reviews';

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

  GetReviewCount(id: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/profile/total/${id}`) 
  }

  DeleteReview(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }


}

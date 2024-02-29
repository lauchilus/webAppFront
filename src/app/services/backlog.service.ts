import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  
  baseUrl = `http://localhost:8080/api/v1/backlogs`;

  constructor(private httpClient : HttpClient) { }

  PostBacklog(userID :string,game : number): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${userID}?gameId=${game}`,null);
  }

  GetAllBacklogs(userID :string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${userID}`);
  }
  

  DeleteBacklog(backlogId : string){
    
    return this.httpClient.delete(`${this.baseUrl}/${backlogId}`);

  }
}

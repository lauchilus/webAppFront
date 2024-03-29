import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  
  baseUrl = `https://gamelist-backend-lauchilus.koyeb.app/api/v1/backlogs`;

  constructor(private httpClient : HttpClient) { }

  PostBacklog(userID :string,game : number): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${userID}?gameId=${game}`,null);
  }

  GetAllBacklogs(userID :string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${userID}`);
  }
  

  DeleteBacklog(backlogId : number){
    console.log(`${this.baseUrl}/${backlogId}`)
    
    return this.httpClient.delete(`${this.baseUrl}/${backlogId}`);

  }

  GetBacklogCount(id: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/profile/total/${id}`) 
  }
}

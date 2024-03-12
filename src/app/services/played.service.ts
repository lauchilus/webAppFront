import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayedService {

  baseUrl = `https://gamelist-backend-lauchilus.koyeb.app/api/v1/played`;

  constructor(private httpClient : HttpClient) { }


  fetchDataPlayed(userId : String, page : number): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${userId}?page=${page}`);
  }

  PostPLayed(user: string, game: number): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${user}?gameID=${game}`,null);
  }

  DeletePlayed(id: string){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  GetPlayedCount(id: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/profile/total/${id}`) 
  }

}

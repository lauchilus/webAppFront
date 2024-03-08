import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {


  baseUrl = `http://localhost:8080/api/v1/favorites`;

  constructor(private httpClient : HttpClient) { }


  fetchDataFavoritesProfile(userId : string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${userId}`);
  }

  PostFavorite(user: string, game: number): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${user}?gameId=${game}`,null);
  }

}

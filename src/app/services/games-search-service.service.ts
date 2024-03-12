import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gameslist } from '../models/gameslist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesSearchServiceService {
  
  baseUrlSearchGames: string = 'https://gamelist-backend-lauchilus.koyeb.app/api/v1/games';

  constructor(private pagination: PaginationService, private httpClient:HttpClient){}

  
  fetchDataList(offset: number): Observable<any> {
    
    return this.httpClient.get(`${this.baseUrlSearchGames}?offset=${offset}`);
  }

  fetchDataListSearch(game: string,offset: number) : Observable<any> {
    return this.httpClient.get(`${this.baseUrlSearchGames}/a/${game}?offset=`+offset);
  }

  getGameDetails(game : number): Observable<any>{
    return this.httpClient.get(`${this.baseUrlSearchGames}/details/${game}`);
  }

}

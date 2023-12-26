import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gameslist } from '../models/gameslist';

@Injectable({
  providedIn: 'root'
})
export class GamesSearchServiceService {
  
  baseUrlSearchGames: string = 'http://localhost:8080/games/a/';

  constructor(private pagination: PaginationService, httpClient:HttpClient){}

  
}

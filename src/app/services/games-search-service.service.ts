import { Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gameslist } from '../models/gameslist';

@Injectable({
  providedIn: 'root'
})
export class GamesSearchServiceService {
  
  baseUrlSearchGames: string = 'http://ec2-52-200-236-21.compute-1.amazonaws.com/games/a/';

  constructor(private pagination: PaginationService, httpClient:HttpClient){}

  
}

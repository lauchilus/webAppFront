import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  baseUrl = `http://localhost:8080/api/v1/lists`;

  constructor(private httpClient : HttpClient) { }

  createList(userId: string, bodyData: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', bodyData.name);
    formData.append('image', image);
  
    return this.httpClient.post(`${this.baseUrl}/${userId}`, formData);
  }

  addGameToList(game:number,collectionID : string): Observable<any>{
   

    return this.httpClient.post<any>(`${this.baseUrl}/addGame/${collectionID}?gameID=${game}`,null);
  }

  fetchUserLists(userId : string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/user/${userId}`)
  }

  fetchUserListGames(collectionId : string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${collectionId}`)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = "https://gamelist-backend-lauchilus.koyeb.app/api/v1/users"

  constructor(private httpClient: HttpClient) { }



  fetchDataUser(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${userId}`);
  }

  editProfile(userId: string, updateUser: any) {
    const formData = new FormData();

    Object.keys(updateUser).forEach(key => {
      if (updateUser[key] !== null && updateUser[key] !== undefined) {
        if (key === 'avatar') {
          // Agregar archivos al FormData
          formData.append(key, updateUser[key]);
        } else {
          // Agregar otros campos de texto al FormData
          formData.append(key, updateUser[key]);
        }
      }
    });
    console.log(updateUser)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(`${this.baseUrl}/${userId}`, formData, {
      headers});
  }



}

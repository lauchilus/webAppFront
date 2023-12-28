import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReviewService } from '../../services/review.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../../models/review';
import { ReviewPost } from '../../models/review-post';
import { List } from '../../models/list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popup-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,FormsModule],
  templateUrl: './popup-list.component.html',
  styleUrl: './popup-list.component.css'
})
export class PopupListComponent {

  create: boolean = false;
  add: boolean = false;
  select: boolean = true;

  listUser: List[] = [];

  inputData: any;

  formImage = new FormData();

  image: any;
  srcResult: any;
  selected: any;
  userId = localStorage.getItem("UID");

  gameId !: number;

  headers !: HttpHeaders;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupListComponent>, private form: MatFormFieldModule, private buildr: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
   }

  ngOnInit(): void {
    this.inputData = this.data;
   
  }

  closePopup() {
    this.ref.close({
      myform: this.myform.value,
      imageform: this.formImage
    });

  }

  myform = this.buildr.group({
    name: this.buildr.control(''),

  });



  baseUrl: string = 'http://localhost:8080/list?';

  createList() {
    const url = this.baseUrl + "userID=" + this.inputData.userId + "&name=" + this.myform.value.name;
    
    console.log("AAAAA"+this.formImage.has('image'))
    this.httpClient.post<any>(url, this.formImage, {headers:this.headers}).subscribe(res => {
      console.log(res);
      console.log(this.formImage)
      this.closePopup();
      alert("List Created!")
    });
    console.log(this.myform.value);
    console.log(this.inputData);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      this.formImage.append('image',file);
    };
    console.log(this.formImage.get('image'))
  }

  addToList(game: number) {
    const url = `http://localhost:8080/list/addGame?userID=${localStorage.getItem('UID')}&gameID=${this.data.gameId}&collectionID=${this.selected}`

    console.log("SELECTED: " + this.selected, " GAME ID: " + this.gameId)

    this.httpClient.post<any>(url, null,{headers: this.headers}).subscribe(res => {
      console.log(res);
      console.log(this.formImage)
      this.closePopup();
      alert("Game added!")
    });
  }

  activateCreateView() {
    this.add = false;
    this.create = true;
    this.select = false;
  }

  activateAddView() {
    this.fetchDataListUser();
    this.add = true;
    this.create = false;
    this.select = false;
  }

  fetchDataListUser() {
    this.httpClient.get(`http://localhost:8080/list?userID=${this.userId}`)
      .subscribe((data: any) => {
        this.listUser = data.map((game: List) => {
          return {

            ...game
          }

            ;
        });
      });
  }
}
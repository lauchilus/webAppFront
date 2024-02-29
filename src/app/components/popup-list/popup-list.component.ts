import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReviewService } from '../../services/review.service';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Review } from '../../models/review';
import { ReviewPost } from '../../models/review-post';
import { List } from '../../models/list';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { ConfigAlert } from '../../models/ConfigAlert';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-popup-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, AlertComponent],
  templateUrl: './popup-list.component.html',
  styleUrl: './popup-list.component.css'
})
export class PopupListComponent {

  showAlert = false;
  configAlert: ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupListComponent>, private form: MatFormFieldModule, private buildr: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute, private listService: ListService) {
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


  createList() {
    if (this.userId != null) {
      const body = {
        name: this.myform.get("name")?.value,
        image: this.formImage.get('image')

      }
      this.listService.createList(this.userId, body, this.formImage.get('image') as File).subscribe(res => {
        this.CreateConfigAlert("List created successfully!", res.HttpStatusCode, "success")
        this.ShowAlert();
        this.closePopup();
      }, (error) => {
        if (error.HttpStatusCode === 401) {
          this.CreateConfigAlert("Please Sign in!", error.HttpStatusCode, "error")
          this.ShowAlert();
          this.closePopup();
        } else {
          this.CreateConfigAlert(error.msg, error.HttpStatusCode, "error")
          this.ShowAlert();
          this.closePopup();
        }

      }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      this.formImage.append('image', file);
    };
    console.log(this.formImage.get('image'))
  }

  addToList(game: number) {

    this.listService.addGameToList(this.inputData.gameId, this.selected).subscribe(res => {
      
        this.CreateConfigAlert("Game added to list successfully!", res.HttpStatusCode, "success")
      this.ShowAlert();
      this.closePopup();
      
      
    }, (error) => {
      if (error.HttpStatusCode === 401) {
        this.CreateConfigAlert("Please Sign in!", error.HttpStatusCode, "error")
        this.ShowAlert();
      } else if(error.HttpStatusCode === 201) {
        this.CreateConfigAlert("Game added to list successfully!", error.HttpStatusCode, "success")
        this.ShowAlert();
      }else{
        this.CreateConfigAlert(error.error.msg, error.HttpStatusCode, "error")
        this.ShowAlert();
        error.error.msg
      }
    }
    );
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
    if (this.userId != null) {
      this.listService.fetchUserLists(this.userId)
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

  ShowAlert() {
    this.showAlert = true;
  }

  CloseAlert() {
    this.showAlert = false;
  }

  CreateConfigAlert(msg: string, status: HttpStatusCode, state: "error" | "success") {
    const config: ConfigAlert = {
      msg,
      status,
      state
    }

    this.configAlert = config;
  }
}
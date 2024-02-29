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
import { AlertComponent } from '../alert/alert.component';
import { ConfigAlert } from '../../models/ConfigAlert';

@Component({
  selector: 'app-popup-review',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,AlertComponent],
  templateUrl: './popup-review.component.html',
  styleUrl: './popup-review.component.css'
})
export class PopupReviewComponent implements OnInit {

  showAlert = false;
  configAlert : ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };
  inputData: any;

  headers: HttpHeaders;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupReviewComponent>, private form: MatFormFieldModule, private buildr: FormBuilder, private httpClient: HttpClient,private reviewService: ReviewService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  ngOnInit(): void {
    this.inputData = this.data;
  }

  closePopup() {
    this.ref.close(this.inputData);
  }

  myform = this.buildr.group({
    review: this.buildr.control(''),
    rating: this.buildr.control(0),

  });

  AddReview() {
    const reviewpost: ReviewPost = {
      review: this.myform.value.review || "",
      userId: this.inputData.userId, // Reemplaza con la propiedad correcta de inputData
      rating: + (this.myform.value.rating || 0),
      gameId: this.inputData.gameId, // Reemplaza con la propiedad correcta de inputData
    };
    this.reviewService.PostReview(reviewpost).subscribe(res => {
      console.log(res);
      this.CreateConfigAlert("Game added to list successfully!", res.HttpStatusCode, "success")
      this.ShowAlert();
      this.closePopup();
    }, (error) => {
      console.log(error)
      if (error.HttpStatusCode === 401) {

        this.CreateConfigAlert("Please Sign in!", error.HttpStatusCode, "error")
        this.ShowAlert();
        this.closePopup();
      } else if(error.HttpStatusCode == 201) {
        this.CreateConfigAlert("Game added to list successfully!", error.HttpStatusCode, "success")
        this.ShowAlert();
        this.closePopup();
      }
    }
    );
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

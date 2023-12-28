import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReviewService } from '../../services/review.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../../models/review';
import { ReviewPost } from '../../models/review-post';

@Component({
  selector: 'app-popup-review',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,],
  templateUrl: './popup-review.component.html',
  styleUrl: './popup-review.component.css'
})
export class PopupReviewComponent implements OnInit {

  inputData : any;

  headers: HttpHeaders;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,private ref: MatDialogRef<PopupReviewComponent>,private form: MatFormFieldModule, private buildr: FormBuilder, private httpClient: HttpClient){
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
      review : this.buildr.control(''),
      rating: this.buildr.control(0),

    });

    

    baseUrl: string = 'http://localhost:8080/reviews';

    AddReview(){
      const reviewpost: ReviewPost = {
        review: this.myform.value.review || "",
        userId: this.inputData.userId, // Reemplaza con la propiedad correcta de inputData
        rating: + (this.myform.value.rating || 0),
        gameId: this.inputData.gameId, // Reemplaza con la propiedad correcta de inputData
      };
      this.httpClient.post<Review>(this.baseUrl,reviewpost,{headers : this.headers}).subscribe(res=>{
        console.log(res);
        
        alert("Review Added!")
      });
      this.closePopup();
      console.log(this.myform.value);
      console.log(this.inputData);
    }
}

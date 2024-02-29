import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gameslist } from '../../models/gameslist';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { Favorite } from '../../models/favorite';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from '../../services/profile.service';
import { ReviewService } from '../../services/review.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {


  editPopup = false;
  avatar!: File;

  username !: string;
  bio !: string;
  profilePic !: string;

  urlTrust = "";
  userId = localStorage.getItem("UID");
  favGames: Favorite[] = [];
  reviews: Review[] = [];
  formImage = new FormData();
  texto: any;

  myform = this.buildr.group({
    username: this.buildr.control(''),
    bio: this.buildr.control(''),

  });

  headers!: HttpHeaders


  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private form: MatFormFieldModule, private buildr: FormBuilder, private profileService : ProfileService,private reviewService: ReviewService,private favoritesService : FavoritesService) { }
  ngOnInit(): void {
    this.fetchDataFavorites();
    this.fetchDataReviews();
    this.fetchDataUser();
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  fetchDataUser(){
    if(this.userId != null){
      this.profileService.fetchDataUser(this.userId).subscribe(
      (data: any) =>{
        this.username = data.username;
        this.bio = data.bio;
        this.profilePic = data.imageUrl;
      }
    )
    }else{
      alert("please login");
    }
    
  }

  fetchDataFavorites() {
    if(this.userId!=null){
      this.favoritesService.fetchDataFavoritesProfile(this.userId)
      .subscribe((data: any) => {
        console.log(data);

        this.favGames = data.map((game: Favorite) => {
          console.log(game.gameImageUrl);
          return {

            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.gameImageUrl)
          }

            ;
        });
      });
    }

    
  }

  fetchDataReviews() {
    if(this.userId != null){
      this.reviewService.GetReviewsForProfileDisplay(this.userId)
      .subscribe((data: any) => {
        console.log(data);

        this.reviews = data.map((review: Review) => {
          return {
            ...review,
            imageUrlTrust: this.getSafeImageUrl(review.gameImage)
          };
        });
      });
    }

    
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      this.formImage.append('avatar', file);
      this.avatar = file;

    };
    console.log(this.formImage)
  }

  editProfile() {
    

  // Crear un objeto que represente la actualización del usuario
  const updateUser = {
    avatar: this.formImage.get('avatar'),
    bio: this.myform.get('bio')?.value,
    username: this.myform.get('username')?.value,
  };
  console.log(updateUser)

  if(this.userId != null){
    this.profileService.editProfile(this.userId,updateUser).subscribe(
    res => {
      alert('Profile Updated!');
    },
    error => {
      console.error('Error updating profile:', error);
      alert("An error has ocurred. Try again!")
    }
  );
  }
  }

  closePopup(event: Event) {
    // Verifica si el clic ocurrió fuera del pop-up
    if (!(event.target as HTMLElement).closest('.bg-white')) {
      this.editPopup = false;
    }
  }

  stopPropagation(event: Event) {
    // Detiene la propagación del evento para evitar que se cierre inmediatamente al hacer clic dentro del pop-up
    event.stopPropagation();
  }
}
interface FormModel {
  username?: string | null;
  bio?: string | null;
  avatar?: File | null;
}

interface UserData{
  id : string,
  username ?: string | "update username",
  bio ?: string | null,
  avatar ?: string 
}
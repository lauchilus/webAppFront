import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Gameslist } from '../../models/gameslist';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Review } from '../../models/review';
import { Favorite } from '../../models/favorite';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from '../../services/profile.service';
import { ReviewService } from '../../services/review.service';
import { FavoritesService } from '../../services/favorites.service';
import { RatingComponent } from "../rating/rating.component";
import { PlayedService } from '../../services/played.service';
import { BacklogService } from '../../services/backlog.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, HttpClientModule, FormsModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, RatingComponent,DatePipe]
})
export class ProfileComponent implements OnInit {

  selectedRating = Array.from({ length: 5 }, (_, index) => index);
  
  totalReviewsFromApi = 0;    
  totalPlayedFromApi = 0;     
  totalBacklogFromApi = 0;     

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
  idParam !: string;


  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private route: ActivatedRoute, private form: MatFormFieldModule, private buildr: FormBuilder, private profileService : ProfileService,private reviewService: ReviewService,private favoritesService : FavoritesService,private playedService: PlayedService,private backlogService: BacklogService) { }
  ngOnInit(): void {
    
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.route.params.subscribe(params => {
      // Obtener el valor del parámetro :id
      this.idParam = params['id'];

      // Ahora puedes usar this.userId en tu componente
      console.log('User ID:', this.userId);
    });
    console.log(this.idParam)
    this.fetchDataFavorites();
    this.fetchDataReviews();
    this.fetchDataUser();
    this.getReviewCount(this.idParam);
    this.getPlayedCount(this.idParam);
    this.getBacklogCount(this.idParam);
    
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  fetchDataUser(){
    if(this.idParam != null){
      this.profileService.fetchDataUser(this.idParam).subscribe(
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
    if(this.idParam !=null){
      this.favoritesService.fetchDataFavoritesProfile(this.idParam)
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
    if(this.idParam != null){
      this.reviewService.GetReviewsForProfileDisplay(this.idParam)
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

  if(this.idParam != null){
    this.profileService.editProfile(this.idParam,updateUser).subscribe(
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


  SelectRating(rating: number){
    //this.selectedRating = rating;
  }

  onRatingClicked(rating: number): void {
    this.cdr.detectChanges();
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index);
  }

  getPlayedCount(user : string){
    return this.playedService.GetPlayedCount(user).subscribe(
      res =>{
        console.log(res)
        this.totalPlayedFromApi = res.total
      }
    );
  }

  getReviewCount(user : string){
    return this.reviewService.GetReviewCount(user).subscribe(
      res =>{
        console.log(res)
        this.totalReviewsFromApi = res.total
      }
    );
  }

  getBacklogCount(user : string){
    return this.backlogService.GetBacklogCount(user).subscribe(
      res =>{
        console.log(res)
        this.totalBacklogFromApi = res.total
      }
    );
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
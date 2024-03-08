import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { GameDetails } from '../../models/game-details';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule, MatFormField } from "@angular/material/form-field";
import { PopupReviewComponent } from '../popup-review/popup-review.component';
import { PopupListComponent } from '../popup-list/popup-list.component';
import { Observable } from 'rxjs';
import { loggerInterceptor } from '../../logger.interceptor';
import { AuthService } from '../../services/auth.service';
import { GamesSearchServiceService } from '../../services/games-search-service.service';
import { FavoritesService } from '../../services/favorites.service';
import { BacklogService } from '../../services/backlog.service';
import { PlayedService } from '../../services/played.service';
import { AlertComponent } from '../alert/alert.component';
import { ConfigAlert } from '../../models/ConfigAlert';


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatDialogModule,AlertComponent],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',


})

export class GameDetailsComponent implements OnInit {

  showAlert = false;
  configAlert : ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };

  private headers!: HttpHeaders;

  gameDetails!: GameDetails;
  httpClient = inject(HttpClient)
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private dialog: MatDialog, private authService: AuthService, private router: Router, private searchService: GamesSearchServiceService,private favoritesService: FavoritesService,private backlogService: BacklogService,private playedService: PlayedService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  ngOnInit(): void {
    const game = this.route.snapshot.params['id'];
    console.log(game)
    this.fetchDataGame(game);

  }

  ShowAlert(){
    this.showAlert = true;
  }

  CloseAlert(){
    this.showAlert = false;
  }


  fetchDataGame(game: number) {
    this.searchService.getGameDetails(game)
      .subscribe((data: any) => {
        console.log(data);
        this.gameDetails = data;
        if (this.gameDetails?.imageUrl) {
          this.gameDetails.imageUrlTrust = this.getSafeImageUrl(this.gameDetails.imageUrl);
        }
      },
        (error) => {
          console.error('Error fetching game details:', error);
        }
      );
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  OpenPopUpReview() {
    if (this.authService.isLogged()) {
      var popup = this.dialog.open(PopupReviewComponent, {
        width: '30%',
        data: {
          userId: localStorage.getItem('UID'),
          gameId: this.gameDetails.id,
          name: this.gameDetails.name,
        }
      })};
  }

  OpenPopUpList() {
    if (this.authService.isLogged()) {
      var popup = this.dialog.open(PopupListComponent, {
        width: '30%',
        data: {
          userId: localStorage.getItem('UID'),
          gameId: this.gameDetails.id
        }
      })};
  }

  AddToPlayed() {
    const userId = localStorage.getItem("UID")
    if (this.authService.isLogged() && userId!=null) {
      this.playedService.PostPLayed(userId,this.gameDetails.id)
        .subscribe((data: any) => {
          this.gameDetails = data;
          this.CreateConfigAlert("Added to played successfully!",data.HttpStatusCode,"success")
          this.ShowAlert();          
          this.ngOnInit()
        },
          (error) => {
            if(error.HttpStatusCode === 401){
              this.CreateConfigAlert("Please Sign in!",error.HttpStatusCode,"error")
              this.ShowAlert();

            this.router.navigateByUrl("/login");
            }else{
              this.CreateConfigAlert(error.error.msg,error.HttpStatusCode,"error")
              this.ShowAlert();
            }
            
          }
        );
    } 
  }

  CreateConfigAlert(msg:string, status : HttpStatusCode, state : "error" | "success"){
    const config : ConfigAlert = {
      msg,
      status,
      state
    }

    this.configAlert = config;
  }

  AddToBacklog() {
    const userId = localStorage.getItem("UID")
    if (this.authService.isLogged() && userId!=null) {
      this.backlogService.PostBacklog(userId,this.gameDetails.id)
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.CreateConfigAlert("Added to backlog successfully!",data.HttpStatusCode,"success")
          this.ShowAlert();
          
          this.ngOnInit()
        },
        (error) => {
          console.log(error)
          if(error.HttpStatusCode === 401){
            this.CreateConfigAlert("Please Sign in!",error.HttpStatusCode,"error")
            this.ShowAlert();

          this.router.navigateByUrl("/login");
          }else{
            this.CreateConfigAlert(error.error.msg,error.HttpStatusCode,"error")
            this.ShowAlert();
          }
          
        }
      );
    } 
    

  }

  AddToFavorites() {
    const userId = localStorage.getItem("UID")
    if (this.authService.isLogged() && userId!=null) {
      this.favoritesService.PostFavorite(userId,this.gameDetails.id)
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.CreateConfigAlert("Added to favorites successfully!",data.HttpStatusCode,"success")
          this.ShowAlert();
          this.ngOnInit()
        },
        (error) => {
          if(error.HttpStatusCode === 401){
            this.CreateConfigAlert("Please Sign in!",error.HttpStatusCode,"error")
            this.ShowAlert();

          this.router.navigateByUrl("/login");
          }else{
            this.CreateConfigAlert(error.error.msg,error.HttpStatusCode,"error")
            this.ShowAlert();
          }
          
        }
      )};
  }

}


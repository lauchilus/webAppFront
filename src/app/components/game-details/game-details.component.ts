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


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatDialogModule,AlertComponent],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',


})

export class GameDetailsComponent implements OnInit {

  showAlert = false;

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
      })
      popup.afterClosed().subscribe(item => {
        console.log(item);
      })
    } else {
      alert("Please Sign in");
      this.router.navigateByUrl("/login");
    }
  }

  OpenPopUpList() {
    if (this.authService.isLogged()) {
      var popup = this.dialog.open(PopupListComponent, {
        width: '30%',
        data: {
          userId: localStorage.getItem('UID'),
          gameId: this.gameDetails.id
        }
      })
      popup.afterClosed().subscribe(item => {
        console.log(item);
      })
    } else {
      alert("Please Sign in");
      this.router.navigateByUrl("/login");
    }
  }

  AddToPlayed() {
    const userId = localStorage.getItem("UID")
    if (this.authService.isLogged() && userId!=null) {
      this.playedService.PostPLayed(userId,this.gameDetails.id)
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          this.ShowAlert();
        },
          (error) => {
            alert("Please Sign in");
            this.router.navigateByUrl("/login");
          }
        );
    } else {
      alert("Please Sign in");
      this.router.navigateByUrl("/login");
    }

  }

  AddToBacklog() {
    const userId = localStorage.getItem("UID")
    if (this.authService.isLogged() && userId!=null) {
      this.backlogService.PostBacklog(userId,this.gameDetails.id)
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to backlog!")
        },
          (error) => {
            alert("Please Sign in");
            this.router.navigateByUrl("/login");
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
          this.ngOnInit();
          alert("Game added to Favorites!")
        },
          (error) => {
            alert("Please Sign in");
            this.router.navigateByUrl("/login");
          }
        );
    } else {
      alert("Please Sign in");
      this.router.navigateByUrl("/login");
    }
  }

}

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { GameDetails } from '../../models/game-details';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule, MatFormField } from "@angular/material/form-field";
import { PopupReviewComponent } from '../popup-review/popup-review.component';
import { PopupListComponent } from '../popup-list/popup-list.component';
import { Observable } from 'rxjs';
import { loggerInterceptor } from '../../logger.interceptor';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatDialogModule,],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',


})

export class GameDetailsComponent implements OnInit {

  private headers!: HttpHeaders;

  gameDetails!: GameDetails;
  httpClient = inject(HttpClient)
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private dialog: MatDialog, private authService: AuthService, private router: Router) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  ngOnInit(): void {
    const game = this.route.snapshot.params['id'];
    console.log(game)
    this.fetchDataGame(game);

  }


  fetchDataGame(game: number) {
    this.httpClient.get(`http://ec2-52-200-236-21.compute-1.amazonaws.com/games/details?id=` + game)
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
    if (this.authService.isLogged()) {
      this.httpClient.post(`http://ec2-52-200-236-21.compute-1.amazonaws.com/played?user=` + localStorage.getItem("UID") + "&gameID=" + this.gameDetails.id, null, { headers: this.headers })
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to plated!")
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
    if (this.authService.isLogged()) {
      this.httpClient.post(`http://ec2-52-200-236-21.compute-1.amazonaws.com/backlog?user=` + localStorage.getItem("UID") + "&gameId=" + this.gameDetails.id, null, { headers: this.headers })
        .subscribe((data: any) => {
          console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to plated!")
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

  AddToFavorites() {
    if (this.authService.isLogged()) {
      this.httpClient.post(`http://ec2-52-200-236-21.compute-1.amazonaws.com/favorite?userId=` + localStorage.getItem('UID') + "&gameId=" + this.gameDetails.id, null, { headers: this.headers })
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

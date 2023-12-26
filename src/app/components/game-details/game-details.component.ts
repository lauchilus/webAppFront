import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameDetails } from '../../models/game-details';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule,MatFormField} from "@angular/material/form-field";
import { PopupReviewComponent } from '../popup-review/popup-review.component';
import { PopupListComponent } from '../popup-list/popup-list.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [HttpClientModule,MatFormFieldModule,MatDialogModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent implements OnInit {

  gameDetails!: GameDetails;
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer,private route: ActivatedRoute, private dialog: MatDialog,) {}

  ngOnInit(): void {
    const game = this.route.snapshot.params['id'];
      console.log(game)
      this.fetchDataGame(game);
  }

  
  fetchDataGame(game: number){
    this.httpClient.get(`http://localhost:8080/games/details?id=` + game)
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

OpenPopUpReview(){
  var popup = this.dialog.open(PopupReviewComponent,{
    width : '30%',
    data:{      
      userId : 3,
      gameId : this.gameDetails.id,
      name : this.gameDetails.name,
    }
  })
  popup.afterClosed().subscribe(item=>{
    console.log(item);
  })
}

OpenPopUpList() {
  var popup = this.dialog.open(PopupListComponent,{
    width : '30%',
    data:{      
      userId : 3,
      gameId : this.gameDetails.id
    }
  })
  popup.afterClosed().subscribe(item=>{
    console.log(item);
    })
  } 

  AddToPlayed(){
    this.httpClient.post(`http://localhost:8080/played?user=` + 3 + "&gameID=" + this.gameDetails.id, null )
      .subscribe((data: any) => {
        console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to plated!")
        },
        (error) => {
          console.error('Error adding game:', error);
        }
      );
  }

  AddToBacklog(){
    this.httpClient.post(`http://localhost:8080/backlog?user=` + 3 + "&gameId=" + this.gameDetails.id, null )
      .subscribe((data: any) => {
        console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to plated!")
        },
        (error) => {
          console.error('Error adding game:', error);
        }
      );
  }

  AddToFavorites(){
    this.httpClient.post(`http://localhost:8080/favorite?userId=` + 3 + "&gameId=" + this.gameDetails.id, null )
      .subscribe((data: any) => {
        console.log(data);
          this.gameDetails = data;
          this.ngOnInit();
          alert("Game added to Favorites!")
        },
        (error) => {
          console.error('Error adding game:', error);
        }
      );
  }

}
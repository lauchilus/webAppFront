import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListInformation } from '../../services/list-information';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupReviewComponent } from '../popup-review/popup-review.component';
import { PopupListComponent } from '../popup-list/popup-list.component';

@Component({
  selector: 'app-lists-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './lists-profile.component.html',
  styleUrl: './lists-profile.component.css'
})
export class ListsProfileComponent implements OnInit {


  objectToPass !: any ;
  listsUser !: List[]
  userId = localStorage.getItem("UID"); ;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private router: ActivatedRoute,private authService:AuthService,private dialog: MatDialog,private route: Router) {}

  ngOnInit(): void {
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    this.httpClient.get(`http://ec2-52-200-236-21.compute-1.amazonaws.com/list?userID=${this.userId}`)
      .subscribe((data: any) => {
        console.log(data);

        this.listsUser = data.map((game: List) => {
          console.log(game.imageUrl);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.imageUrl)
          }
          
          ;
        });
      });
  }

  createList() {
    if (this.authService.isLogged()) {
      var popup = this.dialog.open(PopupListComponent, {
        width: '30%',
        data: {
          userId: localStorage.getItem('UID')
        }
      })
      popup.afterClosed().subscribe(item => {
        console.log(item);
      })
    } else {
      alert("Please Sign in");
      this.route.navigateByUrl("/login");
    }
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  

}
 
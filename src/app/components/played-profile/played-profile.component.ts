import { Component, OnInit } from '@angular/core';
import { Played } from '../../models/played';
import { HttpClient, HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../services/pagination.service';
import { PlayedService } from '../../services/played.service';
import { ConfigAlert } from '../../models/ConfigAlert';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-played-profile',
  standalone: true,
  templateUrl: './played-profile.component.html',
  styleUrl: './played-profile.component.css',
  imports: [CommonModule, HttpClientModule, AlertComponent]
})
export class PlayedProfileComponent implements OnInit {
  showAlert = false;
  configAlert: ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };


  userId = localStorage.getItem("UID");;
  playedList: Played[] = [];
  page: number = 0;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: Router, private paginat: PaginationService, private playedService: PlayedService) { }
  ngOnInit(): void {
    this.page = this.paginat.getOffset();
    this.fetchDataPlayed(this.page);
  }

  fetchDataPlayed(page: number) {
    if (this.userId != null) {
      this.playedService.fetchDataPlayed(this.userId, page)
        .subscribe((data: any) => {
          console.log(data);

          this.playedList = data.map((game: Played) => {
            console.log(game.gameImage);
            return {

              ...game,
              imageUrlTrust: this.getSafeImageUrl(game.gameImage)
            }

              ;
          });
        });
    }

  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }


  nextPage() {
    const offset = this.paginat.getOffset() + 1;
    this.paginat.setOffset(offset);
    this.fetchDataPlayed(offset);
  }
  previousPagination() {
    const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
    this.fetchDataPlayed(Math.max(0, this.page - 12));
  }


  DeletePlayed(played: string) {
    this.playedService.DeletePlayed(played).subscribe(
      (res: any) => {
        this.CreateConfigAlert("deleted from played successfully!", res.HttpStatusCode, "success");
        this.ShowAlert();
        this.ngOnInit()

      },
      (error) => {
        if (error.HttpStatusCode === 401) {
          this.CreateConfigAlert("Please Sign in!", error.HttpStatusCode, "error")
          this.ShowAlert();

          this.route.navigateByUrl("/login");
        } else {
          this.CreateConfigAlert(error.error.msg, error.HttpStatusCode, "error")
          this.ShowAlert();
        }

      }
    );
  }

  CreateConfigAlert(msg: string, status: HttpStatusCode, state: "error" | "success") {
    const config: ConfigAlert = {
      msg,
      status,
      state
    }

    this.configAlert = config;
  }

  ShowAlert() {
    this.showAlert = true;
  }

  CloseAlert() {

    this.showAlert = false;
  }
}

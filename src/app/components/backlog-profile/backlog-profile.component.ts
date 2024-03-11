import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Gameslist } from '../../models/gameslist';
import { PaginationService } from '../../services/pagination.service';
import { BacklogService } from '../../services/backlog.service';
import { Backlogs } from '../../models/backlogs';
import { ConfigAlert } from '../../models/ConfigAlert';
import { AlertComponent } from "../alert/alert.component";

@Component({
    selector: 'app-backlog-profile',
    standalone: true,
    templateUrl: './backlog-profile.component.html',
    styleUrl: './backlog-profile.component.css',
    imports: [CommonModule, HttpClientModule, AlertComponent]
})
export class BacklogProfileComponent implements OnInit {

  showAlert = false;
  configAlert: ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };

  listGames: Backlogs[] = [];
  offset: number = 0;
  userId !: string;



  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private paginat: PaginationService, private route: ActivatedRoute, private backlogService: BacklogService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Obtener el valor del parámetro :id
      this.userId = params['id'];

      // Ahora puedes usar this.userId en tu componente
      console.log('User ID:', this.userId);
    });
    this.fetchDataList();
    console.log(this.listGames)
    this.offset = this.paginat.getOffset()

  }

  fetchDataList() {
    if (this.userId != null) {
      this.backlogService.GetAllBacklogs(this.userId)
        .subscribe((data: any) => {
          console.log(data);

          this.listGames = data.map((games: Gameslist) => {
            return {
              ...games,
              imageUrlTrust: this.getSafeImageUrl(games.imageUrl)
            };
          });
        });
    }

  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  nextPage() {
    const game = this.route.snapshot.params['game'];
    const offset = this.paginat.getOffset() + 12;
    this.paginat.setOffset(offset);
    this.fetchDataList();
  }
  previousPagination() {
    const game = this.route.snapshot.params['game'];
    const offset = Math.max(0, this.paginat.getOffset() - 12);
    this.paginat.setOffset(offset);
    this.fetchDataList();
  }

  DeleteBacklog(backlog: number) {
    this.backlogService.DeleteBacklog(backlog).subscribe(
      (res: any) => {
        this.CreateConfigAlert("deleted from backlog successfully!", res.HttpStatusCode, "success");
        this.ShowAlert();
        this.fetchDataList();

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


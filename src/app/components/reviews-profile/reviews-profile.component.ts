import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { ConfigAlert } from '../../models/ConfigAlert';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-reviews-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule,AlertComponent],
  templateUrl: './reviews-profile.component.html',
  styleUrl: './reviews-profile.component.css'
})
export class ReviewsProfileComponent {

  userId !: string;
  reviews : Review[] = [];

  editPopup = false;

  showAlert = false;
  configAlert : ConfigAlert = {
    msg: '',
    status: HttpStatusCode.Accepted,
    state: 'success'
  };
  
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private reviewService: ReviewService,private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Obtener el valor del parámetro :id
      this.userId = params['id'];

      // Ahora puedes usar this.userId en tu componente
      console.log('User ID:', this.userId);
    });
    this.fetchDataPlayed();
  }

  fetchDataPlayed() {
    const id = this.userId;
    if (id !== null) {
      this.reviewService.GetAllReviewsFromUser(id)
      .subscribe((data: any) => {
        console.log(data);

        this.reviews = data.map((game: Review) => {
          console.log(game.gameImage);
          return {
            
            ...game,
            imageUrlTrust: this.getSafeImageUrl(game.gameImage)
          }
          
          ;
        });
      });
    } else {
      // Manejar el caso en que miElemento es nulo
      console.log("El elemento no está presente en el Local Storage");
    }
    
  }

  getSafeImageUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index);
  }

  DeleteReview(id: string) {
      this.reviewService.DeleteReview(id).subscribe(
        data =>{
          this.CreateConfigAlert(data.msg,data.HttpStatusCode,"success")
          this.ShowAlert();          
          this.ngOnInit()
        },(error) => {
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
  
    closePopup(event: Event) {
      // Verifica si el clic ocurrió fuera del pop-up
      if (!(event.target as HTMLElement).closest('.bg-white')) {
        this.editPopup = false;
      }
    }

    ShowAlert(){
      this.showAlert = true;
    }
  
    CloseAlert(){
      this.showAlert = false;
    }
  
    CreateConfigAlert(msg:string, status : HttpStatusCode, state : "error" | "success"){
      const config : ConfigAlert = {
        msg,
        status,
        state
      }
  
      this.configAlert = config;
    }
}

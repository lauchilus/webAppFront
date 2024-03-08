import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit{
  ngOnInit(): void {
    this.currentRating = 0;
    this.ratingClicked.emit(10);
  }
  
  @Input() maxRating = 5;
  @Input() currentRating = 0;
  @Output() ratingClicked = new EventEmitter<number>();
  array = Array.from({ length: this.maxRating }, (_, index) => index + 1);

  rate(rating: number): void {
    this.currentRating = rating;
    this.ratingClicked.emit(rating);
  }
}

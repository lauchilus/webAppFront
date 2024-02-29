import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  @Input() msg: string = '';
  @Input() state: 'success' | 'error' = 'success';
  @Input() autoClose: boolean = true;
  @Input() closeTime: number = 5000; 
  @Input() status : HttpStatusCode = 201;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    if (this.autoClose) {
      setTimeout(() => {
        this.closeAlert();
      }, this.closeTime);
    }
  }

  closeAlert() {
    this.close.emit();
  }
}
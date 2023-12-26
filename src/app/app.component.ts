import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchGameComponent } from './components/search-game/search-game.component';
import { FooterComponent } from "./components/footer/footer.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, SearchGameComponent, FooterComponent, MatProgressBarModule]
})
export class AppComponent {
  title = 'gamelist-front';
}

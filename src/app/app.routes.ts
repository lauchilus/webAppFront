import { Routes } from '@angular/router';
import { LandingSearchComponent } from './components/landing-search/landing-search.component';
import { SearchListGamesComponent } from './components/search-list-games/search-list-games.component';
import { SearchGameComponent } from './components/search-game/search-game.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlayedProfileComponent } from './components/played-profile/played-profile.component';
import { ReviewsProfileComponent } from './components/reviews-profile/reviews-profile.component';
import { ListsProfileComponent } from './components/lists-profile/lists-profile.component';
import { ListGamesComponent } from './components/list-games/list-games.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BacklogProfileComponent } from './components/backlog-profile/backlog-profile.component';

export const routes: Routes = [
    { path: 'home', component: LandingSearchComponent },
    { path: 'register', component: RegisterComponent },    
    { path: 'login', component: LoginComponent },
    { path: 'details/:id', component: GameDetailsComponent },
    { path: 'search/:game', component: SearchGameComponent },
    { path: 'search', component: SearchListGamesComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'profile/played/:id', component: PlayedProfileComponent },
    { path: 'profile/reviews/:id', component: ReviewsProfileComponent },
    { path: 'profile/backlog/:id', component: BacklogProfileComponent },
    { path: 'profile/list/games/:listId', component: ListGamesComponent },
    { path: 'profile/lists/:id', component: ListsProfileComponent },
    
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
    

];

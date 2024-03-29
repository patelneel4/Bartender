import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquidsComponent } from './liquids/liquids.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiquidSearchComponent } from './liquid-search/liquid-search.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkDetailComponent } from './drink-detail/drink-detail.component';
import { PumpsComponent } from './pumps/pumps.component';
import { PumpDetailComponent } from './pump-detail/pump-detail.component';
import { DrinksCarouselComponent } from './drinks-carousel/drinks-carousel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PourDetailComponent } from './pour-detail/pour-detail.component';
import { CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrinkCreateComponent } from './drink-create/drink-create.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    CountdownModule,
    BrowserAnimationsModule,
    FontAwesomeModule 
  ],
  providers: [],
  declarations: [
    AppComponent,
    LiquidsComponent,
    MessagesComponent,
    DashboardComponent,
    LiquidSearchComponent,
    DrinksComponent,
    DrinkDetailComponent,
    PumpsComponent,
    PumpDetailComponent,
    DrinksCarouselComponent,
    PourDetailComponent,
    DrinkCreateComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'Bartender';
}

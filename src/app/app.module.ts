import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquidsComponent } from './liquids/liquids.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiquidSearchComponent } from './liquid-search/liquid-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
    LiquidsComponent,
    MessagesComponent,
    DashboardComponent,
    LiquidSearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'Bartender';
}

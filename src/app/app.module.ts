import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquidsComponent } from './liquids/liquids.component';
import { MessagesComponent } from './messages/messages.component';

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
    MessagesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'Bartender';
}

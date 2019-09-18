import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupModule } from './group/group.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from './server.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    GroupModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [CookieService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

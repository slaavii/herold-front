import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { ClientService } from './services/client.service';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    FormsModule,
    CustomFormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    NgxCsvParserModule,
    NoopAnimationsModule
    ],
    
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StatusBar,
    SplashScreen,
    AuthenticationService,
    UserService,
    MessageService,
    ClientService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routing/app.routing';

import { AppService } from './app.service';
import { AppComponent } from "./app.component";

import { HomePageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './auth/login/login.component';
import { RegisterPageComponent } from './auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import {SettingPageComponent} from './auth/settings/settings.component'; 
import {NewBookComponent} from './newBook/newBook.component';
import {ListBookComponent} from './listBooks/listBooks.component';
import {DetailBookComponent} from './detailBook/detailBook.component';
import {MyBookComponent} from './MyBook/mybook.component';
import {EditBookComponent} from './editBook/editBook.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginPageComponent,
        RegisterPageComponent,
        HomePageComponent,
        SettingPageComponent,
        ListBookComponent,
        NewBookComponent,
        DetailBookComponent,
        MyBookComponent,
        EditBookComponent
    ],
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
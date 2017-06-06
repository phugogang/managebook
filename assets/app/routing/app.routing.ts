import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../homepage/homepage.component';
import { LoginPageComponent } from '../auth/login/login.component';
import { RegisterPageComponent } from '../auth/register/register.component';
import { SettingPageComponent } from '../auth/settings/settings.component';
import { NewBookComponent } from '../newBook/newBook.component';
import { ListBookComponent } from '../listBooks/listBooks.component';
import { DetailBookComponent } from '../detailBook/detailBook.component';
import { MyBookComponent } from '../MyBook/mybook.component';
import { EditBookComponent } from '../editBook/editBook.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'auth/login', component: LoginPageComponent },
    { path: 'auth/register', component: RegisterPageComponent },
    { path: 'auth/settings', component: SettingPageComponent },
    { path: 'books', component: ListBookComponent },
    { path: 'mybooks', component: MyBookComponent },
    { path: 'books/new', component: NewBookComponent },
    { path: 'books/:id', component: DetailBookComponent },
    { path: 'books/:id/edit', component: EditBookComponent }

]


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {

}
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class AppService {
    constructor(
        private _http: Http){}

    get username() {
        return localStorage.getItem('username');
    }

    get isAuthenticated() {
        return localStorage.getItem('token');
    }


     get sentTokenHeader() {
        var headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return new RequestOptions({headers: headers})
    }



    authLogin(user:any) {      
        return this._http.post('/api/auth/login', user, this.sentTokenHeader)
                    .map((res: Response) => res.json())                    
    }
    

    authRegister(user) {
        return this._http.post('/api/auth/register', user, this.sentTokenHeader)
                    .map((res: Response) => res.json())
    }


    getProfile() {
        return this._http.get('/api/auth/profile', this.sentTokenHeader)
                    .map((res: Response) => res.json());
    }

    updateProfile(city: string, state: string) {
        return this._http.put('/api/auth/profile', {city, state}, this.sentTokenHeader)
                    .map((res: Response) => res.json());

    }

    updatePassword(password: string) {        
        return this._http.put('/api/auth/profile', {password}, this.sentTokenHeader)
                    .map((res: Response) => res.json());
    }



    getListBooks() {
        return this._http.get('/api/books')
                    .map((res: Response) => res.json());
    }

    addNewBook(book) {        
        return this._http.post('/api/books/new', book , this.sentTokenHeader)
                    .map((res: Response) => res.json());
    }

    getDetailBook(id: string) {
        return this._http.get(`/api/books/${id}`)
                    .map((res: Response) => res.json());
    }


    getMyBooks() {
        return this._http.get('/api/books/mybooks', this.sentTokenHeader)
            .map((res:Response) => res.json());

    }
   
   deleteItem(id: string) {
       console.log(id);
       return this._http.delete(`/api/books/${id}`, this.sentTokenHeader)
                    .map((res: Response) => res.json())
   }



}
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject, of } from 'rxjs';
import { map, catchError, debounce, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    keyCloakConfig: any;
    constructor(
        private http: HttpClient,
    ) {
        this.keyCloakConfig = {
            url: environment.url,
            realm: environment.realm,
            clientId: environment.clientId
        }
    }

    logIn(username: string, password: string): Observable<any> {
        const body = new HttpParams()
            .set('client_id', this.keyCloakConfig.clientId)
            .set('grant_type', 'password')
            .set('username', username)
            .set('password', password)
            .set('redirect_uri', 'http://localhost:4200/admin');



        return this.http.post(`${this.keyCloakConfig.url}/realms/${this.keyCloakConfig.realm}/protocol/openid-connect/token`, body.toString(), httpOptions).pipe(
            map((result: any) => {
                console.log(result);
                return result;
            }),
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }

}

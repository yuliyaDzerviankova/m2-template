import {Injectable} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UIRouter, UrlService} from '@uirouter/angular';
import {UserInterface} from '@core/interfaces/user';
import {LoginInterface} from '@core/interfaces/login';

@Injectable()
export class OauthService {

  private authData: any = JSON.parse(localStorage.getItem('authData'));

  public loginData = {
    grant_type: 'password'
  } as LoginInterface;

  public user = {} as UserInterface;

  constructor(private handler: HttpBackend, private apiService: ApiService, private http: HttpClient, private router: UIRouter, private urlService: UrlService) {
    this.http = new HttpClient(handler);
  }

  public init() {
    if (this.authData) {
      return this.getUserData(false);
    }
    else {
      this.activateUrlRouter();
    }
  }

  public login() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http
      .post(environment.api + '/connect/token', this.encodeObjectToParams(this.loginData), {headers: headers})
      .pipe()
      .subscribe((res) => {
        this.setTokenAndSetUserData(res, true);
      });
  }

  public setTokenAndSetUserData(res: object, redirect: boolean) {
    localStorage.setItem('authData', JSON.stringify(res));
    this.getUserData(redirect);
  }

  private getUserData(redirect: boolean) {
    return this.apiService.get('/Account/GetUserData', null)
      .subscribe((res: UserInterface) => {
        this.user = res;
        this.activateUrlRouter();
        if (redirect) {
          return this.router.stateService.go('alerts');
        }
      });
  }

  public logOut() {
    localStorage.removeItem('authData');
    this.user = {} as UserInterface;
    return this.router.stateService.go('login');
  }

  public activateUrlRouter() {
    this.urlService.listen();
    this.urlService.sync();
  }

  public encodeObjectToParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }

}

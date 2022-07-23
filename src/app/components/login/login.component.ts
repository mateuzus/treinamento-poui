import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoDialogService } from '@po-ui/ng-components';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string = ''
  password: string = ''
  companies: string = environment.base_companies

  constructor(private router: Router,
    private http: HttpClient,
    private poDialog: PoDialogService) { }

  ngOnInit(): void {
  }

  loginApi(sucess?: any, error?: any) {
    let senha = `${this.login}:${this.password}`
    let url = this.companies + 'companies'

    console.log(url)

    let headers = new HttpHeaders()
    headers = headers.append("Authorization", "Basic " + btoa(senha))
    headers = headers.append("Content-Type", "application/json")

    return this.http.get(url, {
      headers: headers,
      responseType: 'json',
      withCredentials: true
    }).subscribe(sucess, (error) => {
      console.log(error)
      if (error.status) {
        return this.poDialog.alert({ title: 'Atenção', message: 'Erro no login, revise seus dados!' })
      }
    })
  }

  sendLogin() {
    this.loginApi((item: any) => {
      console.log(item.items)
      if (item.items.length > 0) {
        sessionStorage.setItem('login', this.login)
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 



    this.user = new User(1, '', '', '', '', '', '', 'ROLE_USER', '', 'false');
  }

  ngOnInit(): void {
  }

  onSubmit(form){

    this._userService.signup(this.user).subscribe(


      response => {

        // TOKEN
        if (response.status != 'error') {
          // this.status = response.status;
          this.status = 'success';
          this.token = response;

          // objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(


            response => {

              this.identity = response;

              // persistir datos de usuario
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              this._router.navigate(['inicio']);

              // consola referencia
              console.log(this.token);
              console.log(this.identity);

              //  form.reset();

            },
            error => {
              this.status = 'error';
            }

          );



          // fin
        } else {
          this.status = 'error';
        }

      },
      error => {
        this.status = 'error';
        console.log(error);
      }

    );

  }

}

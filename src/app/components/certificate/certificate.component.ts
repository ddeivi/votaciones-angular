import { Component, OnInit } from '@angular/core';
import * as   jsPDF from 'jspdf';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
  providers: [UserService]
})
export class CertificateComponent implements OnInit {
  public token;
  public identity;
  public fecha;

  constructor(private _userService: UserService) {

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
    this.getDate();
  }

  Certificate(){
    const certificate = new jsPDF();
    certificate.addImage(document.getElementById('image'), 160, 10, 40, 10);
    certificate.text(60, 40, '----------------------------------------------------');

    certificate.fromHTML(document.getElementById('table'), 70, 40);
    certificate.text(60, 100, '----------------------------------------------------');

    certificate.save('Certificado-' + this.identity.name + '-' + this.identity.lastname);
  }

  getDate(){
    var f = new Date();
    this.fecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

  }
  

}

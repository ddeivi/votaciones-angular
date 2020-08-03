import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { global } from '../../services/global';
import { Candidate } from 'src/app/models/candidate';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListService } from '../../services/list.service';
import { TypesService } from '../../services/typesCandidates.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.css'],
  providers: [CandidateService, ListService, TypesService, UserService]

})
export class RegisterCandidateComponent implements OnInit {

  public url;
  public candidate: Candidate;
  public lists;
  public types;
  public token;
  public identity;
  public pathImage;
  public ca;

  public  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url + 'upload',
      headers: {
      "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Selecciona tu imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecciona imagen del candidato',
      afterUploadMsg_success: 'Carga exitosa',
      afterUploadMsg_error: 'Carga fallida'

    }
  };


  constructor(
    private _candidateService: CandidateService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _listService: ListService,
    private _typesService: TypesService,
    private _userService: UserService

  ) {
    this.url = global.url;
    this.candidate = new Candidate('', '', '', '', '', '', '', '');
    this.token =  this._userService.getToken();
    this.identity =  this._userService.getIdentity();

  }

  ngOnInit(): void {
    this.getLists();
    this.getTypes();
  }

  onSubmit(form){
    
   this._candidateService.create(this.token, this.candidate).subscribe(
      response => {
        // poner aviso exitoso
       // this.candidate = response.candidate,
        this.candidate = response.candidate;
        console.log(this.candidate);
        this.alert();


      form.reset();
      },
      error => {
        console.log(error);
        this.alertError();
      }
    );
  }

  getLists(){
    this._listService.getLists().subscribe(
      response => {
        this.lists = response.lists;
        console.log(this.lists);

      },
      error => {
        console.log(error);

      }
    );
  }

  getTypes(){
    this._typesService.getTypes().subscribe(
      response => {
        this.types = response.types;
        console.log(this.types);

      },
      error => {
        console.log(error);
      }
    );
  }
  
  imageUpload(datos){
    let imagedata = JSON.parse(datos.response);
    this.candidate.image = imagedata.image;

  }

  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
      showConfirmButton: false,
      timer: 900
    });
   }

   alertError(){
    Swal.fire({
      icon: 'error',
      title: 'Asegurese de agregar todos los campos',
      showConfirmButton: true
    });
   }

}

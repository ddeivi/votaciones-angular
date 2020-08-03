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
  selector: 'app-edit-candidate',
  templateUrl: '../register-candidate/register-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css'],
  providers: [CandidateService, ListService, TypesService, UserService]

})
export class EditCandidateComponent implements OnInit {
  public url;
  public candidate: Candidate;
  public lists;
  public types;
  public token;
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
  }

  ngOnInit(): void {

    this.getCandidate();
    this.getLists();
    this.getTypes();
   }

   onSubmit(form){
    
    this._candidateService.update(this.token, this.candidate, this.candidate.id).subscribe(
      response => {
        this.alert();

      },
      error => {
        console.log(error);
      
      }
    );
   }
   getCandidate(){

    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._candidateService.getCandidateById(this.token, id).subscribe(
        response => {
         this.candidate = response.candidate;

        },
        error => {
          console.log(error);
        }
      );
    });
   }

   imageUpload(datos){
    let imagedata = JSON.parse(datos.response);
    this.candidate.image = imagedata.image;

  }

  getLists(){
    this._listService.getLists().subscribe(
      response => {
        this.lists = response.lists;
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
      },
      error => {
        console.log(error);
      }
    );
  }
  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Cambios aplicados',
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

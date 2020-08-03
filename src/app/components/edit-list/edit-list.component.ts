import { Component, OnInit } from '@angular/core';
//import { List } from 'src/app/models/list';
import {List} from '../../models/list';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ListService } from '../../services/list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-list',
  templateUrl: '../list/list.component.html',
  styleUrls: ['./edit-list.component.css'],
  providers: [ UserService, ListService]
  

})
export class EditListComponent implements OnInit {

  public page_title;
  public list: List;
  public url;
  public token;
  public identity;

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
      attachPinBtn: 'Selecciona imagen de la lista',
      afterUploadMsg_success: 'Carga exitosa',
      afterUploadMsg_error: 'Carga fallida'

    }
  };

  constructor(
    private _userService: UserService,
    private _listService: ListService,
    private _activateRoute: ActivatedRoute,
    private _router: Router

  ) { 

    this.page_title = 'Editar lista';
    this.url = global.url;
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    this.list = new List('', '', '', 0, '', '');

    this.getList();

  }

  onSubmit(form){
   
  this._listService.update(this.token, this.list, this.list.id).subscribe(
    response => {
      if (response.code === 200) {
        this.alert();
      } else {

        this.alertError();
      }

    },
    error => {
      console.log(error);
    }
  );

  }

  imageUpload(datos){
      let imagedata = JSON.parse(datos.response);
      this.list.image = imagedata.image;

  }

  


  

  getList(){

    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._listService.getListById(id).subscribe(
        response => {

        this.list = response.list;


        },
        error => {
          console.log(error);
         // this.status = 'error';

        }
      );
    });
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

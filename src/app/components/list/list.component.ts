import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ListService } from '../../services/list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[ UserService, ListService]
})
export class ListComponent implements OnInit {
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
    private _listService: ListService
  ) { 

    this.list = new List('', '', '', 0, null, null);
    this.url = global.url;
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();
    this.page_title = 'Registrar lista';

  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._listService.create(this.token, this.list).subscribe(
      response => {
     
        if (response.code === 200) {
          this.alert();
          form.reset();
        } else {
          this.alertError();
        }
     


    //   form.reset();
      },
      error => {
        console.log(error);
        this.alertError();
      }
    );
  }

  imageUpload(datos){
      let imagedata = JSON.parse(datos.response);
      this.list.image = imagedata.image;


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

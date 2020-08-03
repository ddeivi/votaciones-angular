import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { global } from 'src/app/services/global';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ListService, UserService]
})
export class InicioComponent implements OnInit {

  public lists;
  public token;
  public identity;
  public url;

  constructor(
    private _listService: ListService,
    private _userService: UserService

  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getLists();
  }


  getLists() {
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

  delete(id) {

    this._listService.delete(this.token, id).subscribe(
      response => {
        if(response.code === 201){
          this.alerRelacion();
          
      } else {
        this.getLists();
      }
      },
      error => {
        console.log(error);
      }
    );
  }



  ModalDelete(idList, name) {

    try {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Eliminar esta lista?',
        text: 'La lista ' + name + ' será eliminada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,

      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Correcto',
            'La lista ha eliminado',
            'success'

          );
          console.log(this.lists);
          this.delete(idList);





        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha eliminado',
            'error',

          );

        }
      });
    } catch (error) {
      console.log(error);

    }

  }

  alerRelacion() {
    Swal.fire(
      'No se puede eliminar',
      'Existen candidatos relacionados a esta lista',
      'question'
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { global } from '../../services/global';
import { Candidate } from 'src/app/models/candidate';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ListService } from '../../services/list.service';
import { List } from 'src/app/models/list';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-ver-candidatos',
  templateUrl: './ver-candidatos.component.html',
  styleUrls: ['./ver-candidatos.component.css'],
  providers: [CandidateService, UserService, ListService]
})
export class VerCandidatosComponent implements OnInit {
  public url;
  public candidates: Candidate;
  public countList;
  public canditatesList;
  public token;
  public identity;
  public candidate: Candidate;
  public list: List;
  public user: User;
  public vote = 'true';


  constructor(
    private _candidateService: CandidateService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _userService: UserService,
    private _listService: ListService
  ) {
    this.url = global.url;
    this.token = _userService.getToken();
    this.identity = _userService.getIdentity();

    this.candidate = new Candidate('', '', '', '', '', '', '', '');
    this.user = new User(0, '', '', '', '', '', '', '', '', "true");



  }

  ngOnInit(): void {
    this.list = new List('', '', '', 0, '', '');

    this.getCanByList();



  }





  votar() {
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._listService.getListById(id).subscribe(
        response => {
          this.list = response.list;
         // console.log(this.list);
          this.list.numVote = this.list.numVote + 1;

          this._listService.votar(this.token, this.list, id).subscribe(
            response => {
            
              this.voteTrue();
            //  location.reload();
            },
            error => {
              console.log(error);
            }
          )


        },
        error => {
          console.log(error);
          // this.status = 'error';

        }
      );
    });
  }


  voteTrue(){
    this._userService.voteTrue(this.token, this.user).subscribe(
      response => {

      this.refresh();
      },
      error => {
        console.log(error);
      }
    )
  }


  getCanByList() {
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      this._candidateService.getCanByList(id).subscribe(
        response => {

          // console.log(response);
          this.canditatesList = response.candidates;
          console.log(this.canditatesList);


        },
        error => {
          console.log(error);
          // this.status = 'error';

        }
      );
    });
  }


  delete(id) {

    this._candidateService.delete(this.token, id).subscribe(
      response => {
        this.getCanByList();



      },
      error => {
        console.log(error);
      }
    );
  }



  ModalDelete(idCandidate, name, lastname) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Eliminar a este candidato?',
      text: name + ' ' + lastname + ' será eliminad@',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,

    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Correcto',
          'El candidato de ha eliminado',
          'success'

        );
        this.delete(idCandidate);

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



  }

  refresh(){

    console.log(this.identity);
    this.identity.vote = "true";
    localStorage.setItem('identity', JSON.stringify(this.identity));
    this._router.navigate(['/certificate']);


  }





}

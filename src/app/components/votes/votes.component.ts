import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { global } from 'src/app/services/global';
import { VotesService } from '../../services/votes.service';

import { List } from 'src/app/models/list';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  providers: [ListService, UserService, VotesService]

})
export class VotesComponent implements OnInit {
  
  
 
  public lists: List;
  public token;
  public url;
 

  

  constructor(
    private _listService: ListService,
    private _userService: UserService


  ) {
    this.token = this._userService.getToken();
    this.url = global.url;
    
  }

  ngOnInit(): void {
    this.getLists();
  
  }


  getLists() {
    this._listService.getListsVotes().subscribe(
      response => {

        this.lists = response.lists;
      },
      error => {
        console.log(error);
      }
    );
  }





  alerRelacion() {
    Swal.fire(
      'No se puede eliminar',
      'Existen candidatos relacionados a esta lista',
      'question'
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  ownerId = 1
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  setOwner() {
    localStorage.setItem('todoOwnerID', this.ownerId.toString());
    this.todoService.changecurrentStep(Number(this.ownerId));
  }

}

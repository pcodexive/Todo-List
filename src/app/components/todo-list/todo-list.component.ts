import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  public todos: any = [];
  constructor(private router: Router, private todoService: TodoService) { }
  addmode=false;
  name:any;
  description:any;
  id:any;
  ngOnInit() {
    this.loadAllTodoList();
    this.todoService.getEvent().subscribe(res => {
      if (res) {
        this.loadAllTodoList(true);
      }
    })
  }
  ngAfterViewInit() {

  }
  loadAllTodoList(refresh?) {
    this.todos = this.todoService.getAllTodos(refresh);
  }

  onClickEditTodoDetail(id) {
    console.log(id);
    this.router.navigate(['/todo-detail'], { queryParams: { id: id } });
  }

  onClickAddTodo() {
    this.router.navigate(['/todo-detail']);
  }

  onClickTodoDelete(id) {
    this.todoService.deleteTodoDetail(id);
    this.loadAllTodoList();
  }
  onclick(){
    this.addmode=true;
    // console.log("hello");    
  }
  onSubmit(){
    let detail:any={
      "Name": this.name,
      "ID": this.id,
      "Description": this.description,
    }
    this.todoService.updateTodoById(detail,'add');
    this.todos = this.todoService.getAllTodos();
    this.addmode=false ;

 } 
 onDelete(id:any){
  this.todoService.deleteTodoDetail(id);
  this.todos = this.todoService.getAllTodos();

 }
  }


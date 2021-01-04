import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/todo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  public todoId: string;
  public todoDetail = <Todo>{};
  public mode: string;
  imageSrc: string;
  todoDetailForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    file: new FormControl(''),
    status: new FormControl('todo', Validators.required)
  });
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private todoService: TodoService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.todoId = params['id'];
      if (this.todoId !== undefined) {
        console.log(this.todoId);
        this.getTodoDetailById(this.todoId);
        this.mode = 'Edit';
      } else {
        // this.todoId = null;
        console.log(this.todoId);
        this.todoDetail['id'] = 0;
        this.mode = 'Add';
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

      };

    }
  }

  getTodoDetailById(id) {
    this.todoDetail = this.todoService.getTodoById(parseInt(id));
    console.log(this.todoDetail);
    this.todoDetailForm.patchValue({
      title: this.todoDetail.title,
      body: this.todoDetail.body,
      status: this.todoDetail.status
    });
    this.imageSrc = this.todoDetail.img;
  }

  onTodoSubmitForm() {
    console.log(this.todoDetailForm.value);
    if (this.todoDetailForm.valid) {
      this.todoDetail.id = this.todoDetail.id;
      this.todoDetail.title = this.todoDetailForm.value.title;
      this.todoDetail.body = this.todoDetailForm.value.body;
      this.todoDetail.status = this.todoDetailForm.value.status;
      this.todoDetail.img = this.imageSrc;
      this.todoDetail.created = this.todoDetail.created ? this.todoDetail.created : new Date().toISOString();
      this.todoDetail.edited = new Date().toISOString();
      this.todoDetail.deleted = false;
      this.todoDetail.owner = Number(localStorage.getItem('todoOwnerID'));
      this.todoService.updateTodoById(this.todoDetail);
      this.router.navigate(['/todo-list']);
    } else {

    }
  }
  onClickCancel() {
    this.router.navigate(['/todo-list']);
  }

}

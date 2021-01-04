import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
import { Todo } from '../model/todo';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoService {

  public todos: Todo[] = [];
  constructor() { }

  private currentStepObject = new BehaviorSubject<number>(0);
  public currentStepObservable = this.currentStepObject.asObservable();

  getEvent(): BehaviorSubject<any> {
    return this.currentStepObject;
  }
  getAllTodos(refresh?): Todo[] {
    let ownerId = 1;
    if (localStorage.getItem('localData') !== null && !refresh) {
      this.todos = JSON.parse(localStorage.getItem('localData'));
      console.log('Second');
    } else {
      var todoArrayData = [

        {
          "id": 1,
          "title": "Demo",
          "body": "Demo 123",
          "status": "todo",
          "created": "2020-12-30T15:28:46.493Z",
          "edited": "2020-12-30T15:30:46.493Z",
          "deleted": false,
          "owner": 1
        },
        {
          "id": 2,
          "title": "Demo",
          "body": "Demo 123",
          "status": "todo",
          "created": "2020-12-30T15:31:46.493Z",
          "edited": "2020-12-30T15:32:46.493Z",
          "deleted": false,
          "owner": 1
        },
        {
          "id": 3,
          "title": "Demo",
          "body": "Demo 123",
          "status": "todo",
          "created": "2020-12-30T15:33:46.493Z",
          "edited": "2020-12-30T15:34:46.493Z",
          "deleted": false,
          "owner": 2
        }

      ];
      if (localStorage.getItem('todoOwnerID')) {
        ownerId = Number(localStorage.getItem('todoOwnerID'))
      } else {
        localStorage.setItem('todoOwnerID', '1')
      }
      let todoData = [];
      todoArrayData.forEach((data) => {
        if (data.owner === ownerId) {
          todoData.push(data)
        }
      })
      localStorage.setItem('localData', JSON.stringify(todoData));
      this.todos = JSON.parse(localStorage.getItem('localData'));
      // console.log('First');
    }
    return this.todos;
  }

  getTodoById(id: number): Todo {
    var todoArray = JSON.parse(localStorage.getItem('localData'));
    console.log(todoArray);
    return todoArray
      .filter(todo => todo.id === id)
      .pop();
  }

  updateTodoById(todo): Todo {
    if (todo.id === 0) {
      var todoArray = JSON.parse(localStorage.getItem('localData'));
      var todoid = todoArray.length;
      todo.id = ++todoid;
      todoArray.push(todo);
      localStorage.setItem('localData', JSON.stringify(todoArray));
    } else {
      var todoSaveArray = JSON.parse(localStorage.getItem('localData'));
      for (var i in todoSaveArray) {
        if (todoSaveArray[i].id === todo.id) {
          todoSaveArray[i] = todo;
          localStorage.setItem('localData', JSON.stringify(todoSaveArray));
        }
      }
    }
    return todo;
  }

  deleteTodoDetail(id) {
    var todoArray = JSON.parse(localStorage.getItem('localData'));
    for (var i in todoArray) {
      if (todoArray[i].id === id) {
        todoArray.splice(i, 1);
        localStorage.setItem('localData', JSON.stringify(todoArray));
      }
    }
  };

  public changecurrentStep(step: number): void {
    this.currentStepObject.next(step);
  }
}

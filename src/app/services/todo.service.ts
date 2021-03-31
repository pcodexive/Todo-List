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
        setName: 'RN Program Outcomes', 
        setDescription: 'A registered nurse, or RN, typically monitors patients, administers medications, keeps records, consults with healthcare providers, educates patients and more. They typically do not need to meet the masters degree requirement of a nurse practitioner.',
        setID: 'RN',

        elements : [{ 
          Name: 'Baccalaureate Nurse & Patient-centered Care',
        ID: 'RN-BSN-PO1',
        Description: 'Practice using caring, compassionate, culturally competent, and evidence-based practices in the roles of the baccalaureate nurse using the nursing process to provide patient/client-centered care in a variety of healthcare settings.',
        },
        {
        Name: 'Techniques to Effective Communication',
        ID: 'RN-BSN-PO2',
        Description: ' Use a broad base of techniques to communicate effectively with clients, families, healthcare teams, and communities.',
        },
        {
        Name: 'Quality Healthcare in an Evolving System',
        ID: 'RN-BSN-PO3',
        Description: 'Use critical thinking and decision making, local, state, national and global policies, legislative concepts, and healthcare economics to effect quality healthcare in the evolving healthcare system.',
        },
        {
        Name: 'Leadership, Quality, Safety',
        ID: 'RN-BSN-PO4',
        Description: 'Integrate knowledge and skills in nursing leadership and management, quality improvement, and patient safety, as required, to provide healthcare.',
        },
        {
        Name: 'Promote Health & Prevent Disease',
        ID: 'RN-BSN-PO5',
        Description: 'Integrate knowledge and skills to promote health and prevent disease across the lifespan and the continuum of healthcare environments.',
        }
      ]
    }];


      localStorage.setItem('localData', JSON.stringify(todoArrayData));
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

  updateTodoById(todo,action='edit') {  
    console.log(todo);
    
    if (action == 'add') {
      var todoArray = JSON.parse(localStorage.getItem('localData'));
      // var todoid   = todoArray.length;
    // this.todos[0].elements.push(detail)
      todoArray[0].elements.push(todo);
      localStorage.setItem('localData', JSON.stringify(todoArray));
    } else {
      var todoSaveArray = JSON.parse(localStorage.getItem('localData'));
      for (var i in todoSaveArray[0].elements) {
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

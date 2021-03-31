import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TodoListRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TodoListComponent],
  providers: [
  ]
})
export class TodoListModule { }

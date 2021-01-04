import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TopHeaderComponent } from './top-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TopHeaderComponent],
  providers: [
  ],
  exports: [TopHeaderComponent],
})
export class TodoHeaderModule { }

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { TodoHeaderModule } from './components/top-header/todo-header.module';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoHeaderModule,
    FormsModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

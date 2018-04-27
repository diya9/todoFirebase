import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { List } from '../../model/todos';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  newTodo: List= {
    title: ''
  }

  todos:List[];
  id:string;
    
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    console.log("Im in add");
    this.todoService.getTodos().subscribe(list => {
      console.log(list);
      this.todos = list;
     });
  }

  addItem(){
    if(this.id != ''){
      this.todoService.updateItem(this.id,this.newTodo);
      this.newTodo.title ='';
      this.id = '';
    }
    else{
      this.todoService.addTodo(this.newTodo); 
      this.newTodo.title = '';
    }
    
  }

  deleteTodo(todolist){
    this.todoService.deletTodo(todolist);
  }
  
  editTodo(todo){
    this.newTodo.title = todo.title;
    //this.todoService.updateItem(todo);
    this.id = todo.id;
    console.log(typeof this.id);
  }
}

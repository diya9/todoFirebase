import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { List } from '../model/todos';

@Injectable()
export class TodoService {

  todoList: AngularFirestoreCollection<List>;
  todos: Observable<List[]>;
  todoDoc : AngularFirestoreDocument<List>;
  editform: boolean = false;
  itemEdit:List;

  constructor(public db: AngularFirestore) {
    this.todoList = this.db.collection('task');
    this.todos = this.db.collection('task').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as List;
        data.id = a.payload.doc.id;
        return data;
      })
    });
  }

  getTodos() {
    return this.todos;
  }
  addTodo(newTodo: List){
    this.todoList.add(newTodo);
  }
  
  deletTodo(todo : List){
    this.todoDoc = this.db.doc(`task/${todo.id}`);
    this.todoDoc.delete();
  }
  updateItem(id,item:List){
    this.todoDoc = this.db.doc(`task/${id}`);
    this.todoDoc.update(item);
  }
}

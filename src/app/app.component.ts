import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Todo App";

  addTaskForm: FormGroup;
  newTask: FormControl;
  tasks: {
    name: string,
    id:string
  }[]=[];
  selectedOptions: string[] = ['Area 3'];

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    //get Tasks from localStorage if exist.
    if(localStorage.getItem('tasks') != null){
      this.tasks=JSON.parse(localStorage.getItem('tasks'));
    }
  }

  //REACT form builder
  buildForm() {
    this.newTask = new FormControl('', [Validators.required]);
    this.addTaskForm = this.formBuilder.group({
      newTask: this.newTask,
    });
  }


  //submit new task
  submitAddTaskForm() {
    //generate unique ID
    let uuid = UUID.UUID();
    this.tasks.push({name:this.addTaskForm.value.newTask,id:uuid})
   this.addTaskForm.reset();
    //set new task in localstorage
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
  }

  //Remove Seleted Tasks
  removeSelectedRows() {
    this.selectedOptions.forEach(item => {
      let index: number = this.tasks.findIndex(d => d.id === item);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });
  }
}

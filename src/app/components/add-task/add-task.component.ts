import { Component } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  task: Task = {
    title: '',
    description: '',
    completed: false
  };
  submitted = false;
  error: string | null = null;

  constructor(private taskService: TaskService) {}

  saveTask(): void {

    if (!this.task.title) {
      this.error = 'Title is required. Please provide a title.';
      return;
    } 
    const data = {
      title: this.task.title,
      description: this.task.description
    };

    this.taskService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.error = null;
      },
      error: (e) => console.error(e)
    });
  }

  newTask(): void {
    this.submitted = false;
    this.error = null;
    this.task = {
      title: '',
      description: '',
      completed: false
    };
  }
}

import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  tasks: any = [];
  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe(
      (res) => {
        this.tasks = res;
      },
      (err) => console.log(err),
    );
  }
}

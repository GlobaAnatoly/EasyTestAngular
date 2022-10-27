import { Component, OnInit } from '@angular/core';
import { Teacher } from '../models/teacher.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers!: Teacher[];

  constructor(private _testService: TestService) {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
    });
  }

  ngOnInit(): void {}
}

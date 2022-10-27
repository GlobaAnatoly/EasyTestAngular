import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { Test } from '../models/test.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  teachers: Teacher[] = [];
  tests: Test[] = [];
  students: Student[] = [];
  constructor(private _testService: TestService) {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
    });
    this._testService.getAllTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
    });
    this._testService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
    });
  }

  ngOnInit(): void {}
}

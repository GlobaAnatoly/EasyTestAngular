import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students!: Student[];
  constructor(private _testService: TestService) {
    this._testService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {}
}

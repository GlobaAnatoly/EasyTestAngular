import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-item-student',
  templateUrl: './item-student.component.html',
  styleUrls: ['./item-student.component.css'],
})
export class ItemStudentComponent implements OnInit {
  @Input('student') student!: Student;
  constructor() {}

  ngOnInit(): void {}
}

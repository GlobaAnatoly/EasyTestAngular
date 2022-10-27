import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Teacher } from '../../models/teacher.model';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-item-test',
  templateUrl: './item-test.component.html',
  styleUrls: ['./item-test.component.css'],
})
export class ItemTestComponent implements OnInit {
  @Input('test') test: Test = {
    id: 0,
    teacherId: 0,
    subjectId: 0,
    name: '',
  };
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  constructor(private _testService: TestService) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getSubjects();
  }
  getTeachers() {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (e) => console.error(e),
    });
  }
  getTeacherName(id: number | undefined): string {
    var tmp = this.teachers.find((obj) => obj.id == id)?.teacherName as string;
    return tmp;
  }
  getSubjects() {
    this._testService.getAllSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (e) => console.error(e),
    });
  }
  getSubjectName(id: number | undefined): string {
    var tmp = this.subjects.find((obj) => obj.id == id)?.name as string;
    return tmp;
  }
}

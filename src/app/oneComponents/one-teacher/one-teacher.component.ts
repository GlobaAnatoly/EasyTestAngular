import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-one-teacher',
  templateUrl: './one-teacher.component.html',
  styleUrls: ['./one-teacher.component.css'],
})
export class OneTeacherComponent implements OnInit {
  form!: FormGroup;
  // @Input('teacher')
  teacher: Teacher = {
    id: 0,
    teacherName: '',
    teacherLogin: '',
    teacherPassword: new Int32Array(),
    teacherPasswordStr: '',
  };
  tests!: Test[];
  teacherTests: Test = {
    id: 0,
    teacherId: 0,
    subjectId: 0,
    name: '',
  };
  idTeacher!: number;
  teacherName!: string;
  subjects: Subject[] = [];
  //  = {
  //   Id:0,
  //   teacherName: '',
  // };
  constructor(
    public route: ActivatedRoute,
    private _testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeacher();
    this.fillForm();
    this.getTeacherTests();
    this.getSubjectsTests();
  }
  redirect() {
    const routes: string[] = ['/teachers'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  getTeacherTests() {
    this._testService.getAllTests().subscribe({
      next: (data) => {
        // console.log(data);
        this.tests = data.filter((obj) => {
          return obj.teacherId == this.teacher.id;
        });
        console.log(this.tests);
      },
      error: (e) => console.error(e),
    });
  }
  getSubjectsTests() {
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
  getTeacher(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);
      this._testService.getTeacher(+params['id']).subscribe({
        next: (data: Teacher) => {
          this.teacher = {
            id: data.id,
            teacherName: data.teacherName,
            teacherLogin: data.teacherLogin,
            teacherPassword: data.teacherPassword,
            teacherPasswordStr: data.teacherPasswordStr,
          };
          this.getSubjectsTests();
          this.getTeacherTests();
          // console.log(this.teacher);
          // console.log(data);
          this.form.setValue({
            id: data.id,
            teacherName: data.teacherName,
            teacherLogin: data.teacherLogin,
          });
        },
        error: (e) => console.error(e),
      });
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(this.teacher.id, [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      teacherName: new FormControl(this.teacher.teacherName, []),

      teacherLogin: new FormControl(this.teacher.teacherLogin, []),
    });
  }
}

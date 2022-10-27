import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentsTest } from 'src/app/models/studentstest.model';
import { Subject } from 'src/app/models/subject.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-one-student',
  templateUrl: './one-student.component.html',
  styleUrls: ['./one-student.component.css'],
})
export class OneStudentComponent implements OnInit {
  form!: FormGroup;
  student: Student = {
    id: 0,
    studentName: '',
    studentLogin: '',
    studentPassword: undefined,
    studentPasswordStr: '',
  };
  tests: Test[] = [];
  studentTests: StudentsTest[] = [];
  subjects: Subject[] = [];
  constructor(
    private _testService: TestService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudent();
    this.getSubjects();
    this.fillForm();
  }
  redirect() {
    const routes: string[] = ['/students'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  getStudent() {
    this.route.params.subscribe((params: Params) => {
      this._testService.getStudent(+params['id']).subscribe({
        next: (data) => {
          this.student = data;
          this.form.setValue({
            id: data.id,
            studentName: data.studentName,
            studentLogin: data.studentLogin,
          });
          this._testService.getAllStudentsTest().subscribe({
            next: (dataT) => {
              this.studentTests = dataT.filter(
                (student) => student.studentId == data.id
              );

              this._testService.getAllTests().subscribe({
                next: (dataTest) => {
                  this.tests = dataTest;
                },
              });
            },
            error: (e) => console.error(e),
          });
        },
        // error: (e) => console.error(e),
      });
    });
  }
  getSubjects() {
    this._testService.getAllSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (e) => console.error(e),
    });
  }
  getSubjectName(testId: number | undefined): string {
    var tmp = '';
    var testTmp = this.tests.find((test) => test.id == testId)
      ?.subjectId as number;
    tmp = this.subjects.find((obj) => obj.id == testTmp)?.name as string;
    return tmp;
  }
  getTestName(id: number | undefined) {
    var tmp = this.tests.find((obj) => obj.id == id)?.name as string;
    return tmp;
  }
  getTime(time: Date): string {
    var pipe = new DatePipe('en-GB');
    return pipe.transform(time, 'd/M/yy, h:mm a') as string;
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(this.student.id, []),
      studentName: new FormControl(this.student.studentName, []),

      studentLogin: new FormControl(this.student.studentLogin, []),
    });
  }
}

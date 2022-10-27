import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentsTest } from 'src/app/models/studentstest.model';
import { Subject } from 'src/app/models/subject.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
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
  confirm: boolean = false;
  constructor(
    private _testService: TestService,
    public route: ActivatedRoute,

    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.getStudent();
    this.getSubjects();
    this.fillForm();
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

              // this.studentTests.forEach((element) => {
              //   element.time = pipe.transform(element.time, 'dd/MM/yyyy');
              // });
              this._testService.getAllTests().subscribe({
                next: (dataTest) => {
                  this.tests = dataTest;
                  console.log(this.tests);
                },
              });
            },
            error: (e) => console.error(e),
          });
        },
        error: (e) => console.error(e),
      });
    });
  }
  getTime(time: Date): string {
    var pipe = new DatePipe('en-GB');
    return pipe.transform(time, 'd/M/yy, h:mm a') as string;
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
  redirect() {
    const routes: string[] = ['/students'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  showAlert() {
    const formData = { ...this.form.value };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: formData.id,
      type: 'student',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      console.log('confirmTs');
      this.deleteStudent();
      // this.redirect();
    }
  }
  editStudent() {
    const formData = { ...this.form.value };
    const tempStudent: Student = {
      id: this.student.id,
      studentName: formData.studentName,
      studentLogin: formData.studentLogin,
      studentPassword: this.student.studentPassword,
      studentPasswordStr: '',
    };
    this._testService.putStudent(this.student.id, tempStudent).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.redirect();
  }
  deleteStudent() {
    throw new Error('Method not implemented.');
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(this.student.id, []),
      studentName: new FormControl(this.student.studentName, [
        Validators.required,
      ]),

      studentLogin: new FormControl(this.student.studentLogin, [
        Validators.required,
      ]),
    });
  }
}

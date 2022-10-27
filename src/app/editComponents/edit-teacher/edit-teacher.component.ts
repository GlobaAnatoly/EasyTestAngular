import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Test } from 'src/app/models/test.model';

import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  // @Input('teacher')
  form!: FormGroup;
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

  subjects: Subject[] = [];
  confirm: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private _testService: TestService,
    private router: Router,
    private SimpleModalService: SimpleModalService
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
  showAlert() {
    const formData = { ...this.form.value };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: formData.id,
      type: 'teacher',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      this.deleteTeacher();
      // this.redirect();
    }
  }
  deleteTeacher() {
    this._testService.deleteTeacher(this.teacher.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }
  editTeacher() {
    const formData = { ...this.form.value };
    const tempTeacher: Teacher = {
      id: this.teacher.id,
      teacherName: formData.teacherName,
      teacherLogin: formData.teacherLogin,
      teacherPassword: this.teacher.teacherPassword,
      teacherPasswordStr: '',
    };
    var enc = new TextDecoder('utf-8');
    console.log(this.teacher.teacherPasswordStr);
    this._testService.putTeacher(this.teacher.id, tempTeacher).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.redirect();
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

    // console.log(this.tests);
  }
  getSubjectsTests() {
    this._testService.getAllSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (e) => console.error(e),
    });
    // console.log(this.subjects);
  }
  getSubjectName(id: number | undefined): string {
    var tmp = this.subjects.find((obj) => obj.id == id)?.name as string;
    return tmp;
  }
  getTeacher(): void {
    this.route.params.subscribe((params: Params) => {
      this._testService.getTeacher(+params['id']).subscribe({
        next: (data: Teacher) => {
          this.teacher = {
            id: data.id,
            teacherName: data.teacherName,
            teacherLogin: data.teacherLogin,
            teacherPassword: data.teacherPassword,
            teacherPasswordStr: data.teacherPasswordStr,
          };
          // console.log(this.teacher);
          // console.log(data);
          this.getTeacherTests();
          this.getSubjectsTests();
          this.form.setValue({
            id: data.id,
            teacherName: data.teacherName,
            teacherLogin: data.teacherLogin,
          });
        },
        error: (e) => console.error(e),
      });
    });
    // console.log(this.teacher);
    // this.fillForm();
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(this.teacher.id, [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      teacherName: new FormControl(this.teacher.teacherName, [
        Validators.required,
      ]),

      teacherLogin: new FormControl(this.teacher.teacherLogin, [
        Validators.required,
      ]),
    });

    // console.log(this.form.value);
  }
}

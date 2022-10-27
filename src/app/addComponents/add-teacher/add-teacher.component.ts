import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from '../../models/teacher.model';
import { TestService } from '../../services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
import {} from 'crypto-ts';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  form!: FormGroup;
  teacher: Teacher = {
    id: 0,
    teacherName: '',
    teacherLogin: '',
    teacherPassword: '',
    teacherPasswordStr: '',
  };
  confirm: boolean = false;
  constructor(
    private router: Router,
    private _testService: TestService,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.fillForm();
  }
  redirect() {
    const routes: string[] = ['/home'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  saveTeacher(tempTeacher: Teacher) {
    this._testService.postTeacher(tempTeacher).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
     this.redirect();
  }
  showAlert() {
    const formData = { ...this.form.value };
    const tempTeacher: Teacher = {
      id: this.teacher.id,
      teacherName: formData.teacherName,
      teacherLogin: formData.teacherLogin,
      teacherPassword: this.teacher.teacherPassword,
      teacherPasswordStr: formData.teacherPassword,
    };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Добавление',
      message: 'Подтвердить добавление?',
      id: this.teacher.id,
      type: 'teacherAdd',
      data: tempTeacher,
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      this.saveTeacher(tempTeacher);
      // this.redirect();
    }
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Формируется автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      teacherName: new FormControl('', [Validators.required]),

      teacherLogin: new FormControl('', [Validators.required]),
      teacherPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      teacherPasswordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // console.log(this.form.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { TestService } from '../../services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  form!: FormGroup;
  student: Student = {
    id: 0,
    studentName: '',
    studentLogin: '',
    studentPassword: '',
    studentPasswordStr: '',
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
  saveStudent(tempStudent: Student): void {
    this._testService.postStudent(tempStudent).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    // this.redirect();
  }
  redirect() {
    const routes: string[] = ['/home'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  showAlert() {
    const formData = { ...this.form.value };
    const tempStudent: Student = {
      id: this.student.id,
      studentName: formData.studentName,
      studentLogin: formData.studentLogin,
      studentPassword: this.student.studentPassword,
      studentPasswordStr: formData.studentPassword,
    };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Добавление',
      message: 'Подтвердить добавление?',
      id: this.student.id,
      type: 'studentAdd',
      data: tempStudent,
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      this.saveStudent(tempStudent);
      // this.redirect();
    }
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Формируется автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      studentName: new FormControl('', [Validators.required]),

      studentLogin: new FormControl('', [Validators.required]),
      studentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      studentPasswordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // console.log(this.form.value);
  }
}

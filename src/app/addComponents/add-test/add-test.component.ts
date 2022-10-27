import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { Teacher } from '../../models/teacher.model';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
})
export class AddTestComponent implements OnInit {
  form!: FormGroup;
  test: Test = {
    id: 0,
    teacherId: 0,
    subjectId: 0,
    name: '',
  };
  teacherId: number = 0;
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  confirm: boolean = false;
  constructor(
    private _testService: TestService,
    public route: ActivatedRoute,
    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.fillForm();
    this.getSubjects();
    this.getTeachers();
  }
  getTeachers() {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (e) => console.error(e),
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
  deleteSubject() {
    var tmp = this.subjects.find(
      (obj) => obj.name == this.form.controls['subjectName'].value
    );
    console.log(tmp);
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: tmp?.id as number,
      type: 'subjectDelete',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      this.getSubjects();
    }
  }
  saveTest() {
    const formData = { ...this.form.value };
    const tmpTest: Test = {
      id: 0,
      teacherId: this.teachers.find(
        (teacher) =>
          teacher.teacherName == this.form.controls['teacherName'].value
      )?.id as number,
      subjectId: this.subjects.find(
        (obj) => obj.name == this.form.controls['subjectName'].value
      )?.id as number,
      name: formData.testName,
    };
    this._testService.postTest(tmpTest).subscribe({
      next: (res) => {
        tmpTest.id = res.id;
        this.redirect(tmpTest.id);
      },
      error: (e) => console.error(e),
    });
    console.log(tmpTest.id);
  }
  redirect(id: number) {
    this.router.navigate(['/questions/add'], {
      queryParams: { testId: id },
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Устанавливается автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      testName: new FormControl('', [Validators.required]),
      teacherName: new FormControl('', [Validators.required]),
      subjectName: new FormControl('', [Validators.required]),
    });
  }
}

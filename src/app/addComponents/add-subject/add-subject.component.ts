import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private _testService: TestService) {}

  ngOnInit(): void {
    this.fillForm();
  }
  redirect() {
    const routes: string[] = ['/tests/add'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Формируется автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      subjectName: new FormControl('', [Validators.required]),
    });
  }
  saveSubject() {
    const formData = { ...this.form.value };
    const tempSubject: Subject = {
      id: 0,
      name: formData.subjectName,
    };
    this._testService.postSubject(tempSubject).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.redirect();
  }
}

import { Component, OnInit } from '@angular/core';
import { AnswerVariant } from 'src/app/models/answervariant.model';

import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-answervariant',
  templateUrl: './edit-answervariant.component.html',
  styleUrls: ['./edit-answervariant.component.css'],
})
export class EditAnswervariantComponent implements OnInit {
  form!: FormGroup;
  answervariant: AnswerVariant = {
    id: 0,
    idQuestion: 0,
    name: '',
    isCorrect: false,
  };
  questions: Question[] = [];
  confirm: boolean = false;
  constructor(
    public route: ActivatedRoute,
    private _testService: TestService,
    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.getAnswer();
    this.fillForm();
  }
  showAlert() {
    const formData = { ...this.form.value };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: formData.id,
      type: 'answer',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.redirect();
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      // this.redirect();
    }
  }
  getAnswer() {
    this.route.params.subscribe((params: Params) => {
      this._testService.getAnswerVariant(+params['id']).subscribe({
        next: (data) => {
          this.answervariant = data;
          console.log(data);
          this.form.controls['id'].setValue(data.id);
          this.form.controls['answerName'].setValue(data.name);
          this.form.controls['isCorrect'].setValue(data.isCorrect);
          this._testService.getQuestion(data.idQuestion).subscribe({
            next: (data) => {
              this.form.controls['questionName'].setValue(data.name);
            },
          });
        },
      });
    });
  }
  deleteAnswer() {
    throw new Error('Method not implemented.');
  }
  editAnswer() {
    const formData = { ...this.form.value };
    var bool: boolean = false;
    if (formData.isCorrect === 'true') bool = true;
    if (formData.isCorrect === 'false') bool = false;
    const answerTmp: AnswerVariant = {
      id: this.answervariant.id,
      idQuestion: this.answervariant.idQuestion,
      name: formData.answerName,
      isCorrect: bool,
    };
    this._testService
      .putAnswerVariant(this.answervariant.id, answerTmp)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
    this.redirect();
  }
  redirect() {
    const routes: string[] = [
      `/questions/edit/${this.answervariant.idQuestion}`,
    ];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(' ', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      questionName: new FormControl(' ', [Validators.required]),
      answerName: new FormControl('', [Validators.required]),
      isCorrect: new FormControl(' ', [Validators.required]),
      questionType: new FormControl(' ', [Validators.required]),
    });
  }
}
